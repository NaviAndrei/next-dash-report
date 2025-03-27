import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie';

// Make mockUsers mutable between sessions for demo purposes
let mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    // In a real app, this would be hashed. This is just for demo purposes.
    password: "password123",
    role: "admin", // Set John Doe as admin by default
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  role?: string; // Add optional role to User interface
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authError: string | null;
  isLoading: boolean;
  registeredUsers: Array<{id: string; name: string; email: string; password: string; role?: string}>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearAuthError: () => void;
  updateUserProfile: (updates: Partial<User>) => boolean; // Add new function to update user profile
}

// Helper function to set an auth cookie (for middleware to read)
const setAuthCookie = (isAuthenticated: boolean, user: User | null) => {
  // Set a cookie that middleware can read (unlike localStorage)
  const cookieValue = JSON.stringify({ isAuthenticated, user });
  
  // Set cookie with appropriate options
  Cookies.set('auth-token', cookieValue, { 
    expires: 7, // 7 days
    path: '/',
    sameSite: 'strict'
  });
  
  console.log("Auth cookie set:", cookieValue);
};

// Helper to clear the auth cookie
const clearAuthCookie = () => {
  Cookies.remove('auth-token', { path: '/' });
  console.log("Auth cookie cleared");
};

// Ensure John Doe is always an admin
const ensureAdminUser = (users: any[]) => {
  const johnDoeIndex = users.findIndex(u => u.email === "john@example.com");
  
  if (johnDoeIndex >= 0) {
    // John Doe exists, make sure he's an admin
    users[johnDoeIndex].role = "admin";
  } else {
    // John Doe doesn't exist, add him
    users.push({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "admin"
    });
  }
  
  return users;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      authError: null,
      isLoading: false,
      registeredUsers: ensureAdminUser([...mockUsers]),

      login: async (email: string, password: string) => {
        set({ isLoading: true, authError: null });
        console.log("Login function called with:", email);

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 800));

          // Get the list of registered users from the store
          const { registeredUsers } = get();
          
          // Ensure John Doe is always an admin
          const updatedUsers = ensureAdminUser([...registeredUsers]);
          if (JSON.stringify(updatedUsers) !== JSON.stringify(registeredUsers)) {
            set({ registeredUsers: updatedUsers });
          }
          
          console.log("Registered users:", updatedUsers);
          
          // First try to find user in our mock database
          const allUsers = [...mockUsers, ...updatedUsers];
          const uniqueUsers = Array.from(
            new Map(allUsers.map(user => [user.email, user])).values()
          );
          
          // Ensure John Doe is always an admin in the uniqueUsers list
          const finalUsers = ensureAdminUser([...uniqueUsers]);
          
          console.log("All unique users:", finalUsers);

          // Find user with matching email and password
          const user = finalUsers.find(
            (u) => u.email === email && u.password === password
          );

          console.log("User found:", user ? "yes" : "no");

          if (user) {
            // Remove password from user object before setting to state
            const { password, ...userWithoutPassword } = user;
            
            // Update state
            set({
              user: userWithoutPassword as User,
              isAuthenticated: true,
              isLoading: false,
            });
            
            // Set cookie for server-side auth check
            setAuthCookie(true, userWithoutPassword as User);
            
            return true;
          } else {
            set({
              authError: "Invalid email or password",
              isLoading: false,
            });
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          set({
            authError: "An error occurred during login",
            isLoading: false,
          });
          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, authError: null });
        console.log("Register called with:", email);

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 800));

          // Get the current state
          const state = get();
          
          // Make sure John Doe is always an admin
          const updatedUsers = ensureAdminUser([...state.registeredUsers]);
          if (JSON.stringify(updatedUsers) !== JSON.stringify(state.registeredUsers)) {
            set({ registeredUsers: updatedUsers });
          }
          
          const allUsers = [...mockUsers, ...updatedUsers];
          
          // Check if user already exists
          const existingUser = allUsers.find((u) => u.email === email);

          if (existingUser) {
            set({
              authError: "Email already in use",
              isLoading: false,
            });
            return false;
          }

          // In a real app, you would hash the password and save to DB
          const newUser = {
            id: (allUsers.length + 1).toString(),
            name,
            email,
            password,
            role: "user", // Default role for new users
          };

          // Add to registered users
          console.log("Adding new user:", newUser);
          const newRegisteredUsers = [...updatedUsers, newUser];
          
          // Ensure John Doe is still an admin after adding the new user
          const finalRegisteredUsers = ensureAdminUser(newRegisteredUsers);
          
          set({ registeredUsers: finalRegisteredUsers });

          // Set user in state (without password)
          const { password: _, ...userWithoutPassword } = newUser;
          
          // Update state
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Set cookie for server-side auth check
          setAuthCookie(true, userWithoutPassword);
          
          return true;
        } catch (error) {
          console.error("Registration error:", error);
          set({
            authError: "An error occurred during registration",
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        // Clear auth cookie
        clearAuthCookie();
        
        // Reset state
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      clearAuthError: () => {
        set({ authError: null });
      },
      
      // Add new function to update user profile
      updateUserProfile: (updates: Partial<User>) => {
        try {
          const state = get();
          const currentUser = state.user;
          
          if (!currentUser || !currentUser.id) {
            console.error("No user is currently logged in");
            return false;
          }
          
          // Update the current user in state
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
          
          // Update the user in registeredUsers array
          const { registeredUsers } = state;
          const updatedRegisteredUsers = registeredUsers.map(user => {
            if (user.id === currentUser.id) {
              // Keep the password but update other fields
              return { ...user, ...updates };
            }
            return user;
          });
          
          // Make sure John Doe is still an admin
          const finalRegisteredUsers = ensureAdminUser(updatedRegisteredUsers);
          set({ registeredUsers: finalRegisteredUsers });
          
          // Update the cookie
          setAuthCookie(true, updatedUser);
          
          console.log("User profile updated:", updatedUser);
          return true;
        } catch (error) {
          console.error("Error updating user profile:", error);
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      skipHydration: true,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers
      }),
    }
  )
); 