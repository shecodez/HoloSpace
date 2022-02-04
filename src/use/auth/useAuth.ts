import { Provider, User } from '@supabase/supabase-js';
import { ref } from 'vue';

import { IAuth } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

// Note: user is set outside the useAuth function
// so user is global, and refers to a single user
const user = ref<User>();

export default function useAuth() {
  const { supabase } = useSupabase();

  /**
   * Login with email and password
   */
  const login = async ({ email, password }: IAuth) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;

    return user;
  };

  /**
   * Handle auth via Third Pary Login (google, github, etc.)
   * https://supabase.io/docs/guides/auth#third-party-logins
   */
  const authWithExternalProvider = async (provider: Provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;

    return user;
  };

  /**
   * Handles OAuth via Google
   */
  function authWithGoogle() {
    return authWithExternalProvider('google');
  }

  /**
   * Handles OAuth via Twitter
   */
  function authWithTwitter() {
    return authWithExternalProvider('twitter');
  }

  /**
   * Handles OAuth via Facebook
   */
  function authWithFacebook() {
    return authWithExternalProvider('facebook');
  }

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => !!user.value;

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }: IAuth) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        // Note: arbitrary meta data is passed as the second arg
        // under a key called data to the Supabase signUp method
        data: meta,
      },
    );
    if (error) throw error;

    return user;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data: IAuth) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;

    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordResetEmail = async (email: string) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;

    return data;
  };

  return {
    user,
    login,
    authWithExternalProvider,
    authWithGoogle,
    authWithTwitter,
    authWithFacebook,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordResetEmail,
  };
}
