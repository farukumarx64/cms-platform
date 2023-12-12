// auth.js
import { createClient } from "@supabase/supabase-js";

class Auth {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async signUp({ email, password }) {
    try {
      const { user, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Sign-up error:", error.message);
      } else {
        console.log("Sign-up successful:", user);
        // You can optionally handle the signed-up user, e.g., store user data in a database
        return user;
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      throw error;
    }
  }

  async signIn({ email, password }) {
    console.log(email);
    try {
      const { user, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Logged in successfully:", user);
        // You can optionally handle the logged-in user
        return user;
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  }

  async getSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        console.error("Session retrieval error:", error.message);
      } else {
        console.log("Session retrieved: ", data);
        return data;
      }
    } catch (error) {
      console.error("Error retrieving session:", error.message);
      throw error;
    }
  }

  signOut() {
    this.supabase.auth.signOut();
    // You can optionally perform additional actions after sign-out
  }
}

export default Auth;
