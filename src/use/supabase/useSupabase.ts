import { createClient } from '@supabase/supabase-js';
// import useAuth from '@/use/auth';

// Note: these are 100% exposed to the client but that's OK
// because security is provided by RLS - Row Level Security
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// setup client
const supabase = createClient(supabaseUrl, supabaseKey);

// setup auth state listener
/* supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user data
  const { user } = useAuth();

  // if the user exists in the session we're logged in
  // & can set the reactive ref to user from undefined
  user.value = session?.user || undefined;
}); */

// expose supabase client
export default function useSupabase() {
  return { supabase };
}
