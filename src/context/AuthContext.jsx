import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  signIn,
  signUp,
  signOut,
  getSession,
} from "../utils/auth";
import { supabase } from "../utils/supabase"; // Add this import

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session } = await getSession();

        if (session) {
          console.log("Valid session found:", session);
          // Get the complete user data
          try {
            const userData = await getCurrentUser();
            setUser(userData);
          } catch (userError) {
            console.error(
              "Error fetching user data from valid session:",
              userError
            );
            setUser(session.user);
          }
        } else {
          console.log("No active session found");
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Add session listener to keep auth state in sync
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);

      if (session?.user) {
        getCurrentUser()
          .then((fullUser) => setUser(fullUser))
          .catch((error) => {
            console.error("Error fetching full user data:", error);
            setUser(session.user);
          });
      } else {
        setUser(null);
      }
    });

    // Updated subscription access to match Supabase's API structure
    return () => {
      data.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const { user } = await signIn(email, password);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login error in context:", error);
      throw error;
    }
  };

  const register = async (email, password, confirmPassword, userData) => {
    try {
      const { user } = await signUp(email, password, confirmPassword, userData);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Registration error in context:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error in context:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    // signOut: logout, // Rename for consistency
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
