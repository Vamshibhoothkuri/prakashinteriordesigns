
-- Lock down has_role execution (still callable from RLS policies internally because SECURITY DEFINER)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Restrict portfolio bucket listing: only allow read of known files (still works for public URLs which don't require RLS)
DROP POLICY "Portfolio public read" ON storage.objects;
-- Portfolio files are served via public URLs; no RLS select policy is needed for public access.
-- For authenticated admins who may want to list, add:
CREATE POLICY "Admins list portfolio" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
