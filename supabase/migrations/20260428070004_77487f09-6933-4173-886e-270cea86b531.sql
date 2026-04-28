
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by owner" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles insertable by owner" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Profiles updatable by owner" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Auto-create profile on signup, assign customer role by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Portfolio items (admin uploads)
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  cover_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio is public" ON public.portfolio_items
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert portfolio" ON public.portfolio_items
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update portfolio" ON public.portfolio_items
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete portfolio" ON public.portfolio_items
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Customer submitted designs
CREATE TABLE public.customer_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own designs" ON public.customer_designs
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all designs" ON public.customer_designs
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own designs" ON public.customer_designs
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own designs" ON public.customer_designs
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('customer-designs', 'customer-designs', false);

-- Portfolio bucket policies: public read, admin write
CREATE POLICY "Portfolio public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admins upload portfolio" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update portfolio files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete portfolio files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

-- Customer designs bucket: users manage their own folder (user_id/filename), admins can read all
CREATE POLICY "Users read own design files" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'customer-designs' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "Admins read all design files" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'customer-designs' AND public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Users upload own design files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'customer-designs' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "Users delete own design files" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'customer-designs' AND auth.uid()::text = (storage.foldername(name))[1]
  );
