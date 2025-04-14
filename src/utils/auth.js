import { supabase } from '../utils/supabase';


export const signUp = async ({ email, password, full_name, role = "user", avatar = null, adminCode }) => {
  // Verify admin code if registering as admin
  if (role === "admin") {
    const ADMIN_SECRET = "ADMIN123";
    if (adminCode !== ADMIN_SECRET) {
      return { error: new Error("Invalid admin code") };
    }
  }

  // 1. First create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        role,
      }
    }
  });

  if (authError) return { error: authError };

  // 2. Insert into users table (if you still need this separate table)
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email,
      full_name,
      role,
      avatar
    });

  if (insertError) return { error: insertError };

  return { data: authData };
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Error during login:", error);
      throw error;
    }

    if (!data || !data.user) {
      console.error("No user data returned after login");
      throw new Error("Failed to authenticate");
    }

    console.log("User successfully logged in:", data.user);
    return { user: data.user };
  } catch (err) {
    console.error("Sign in exception:", err);
    throw err;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  try {
    // Get the user from Supabase auth
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting current user:", error);
      throw error;
    }

    if (!user) {
      console.log("No authenticated user found");
      return null;
    }

    // Now fetch additional profile data from the 'users' table
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle(); // Use maybeSingle instead of single

    if (fetchError) {
      console.error("Error fetching user profile:", fetchError);
      throw fetchError;
    }

    // Combine the auth data with the profile data
    return {
      ...user,
      ...data,
      // Fallback to auth user data if profile data is missing
      full_name: data?.full_name || user.user_metadata?.full_name,
      role: data?.role || user.user_metadata?.role || 'user'
    };
  } catch (err) {
    console.error("getCurrentUser exception:", err);
    throw err;
  }
};

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
};

export const checkEmailVerification = async (email) => {
  try {
    // This is a workaround to check if email is verified
    // Attempt to get user by email, which will work for admins or
    // you can create a serverless function to check this securely
    const { data, error } = await supabase
      .from('users')
      .select('email_confirmed_at')
      .eq('email', email)
      .single();

    if (error) throw error;

    return !!data?.email_confirmed_at;
  } catch (error) {
    console.error("Error checking email verification:", error);
    return false;
  }
};

export const resendVerificationEmail = async (email) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email
  });

  if (error) throw error;
};

// Add function to get session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};