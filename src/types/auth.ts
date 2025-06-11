// Types pour l'utilisateur et l'authentification
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
  app_metadata?: {
    provider?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  clearError: () => void;
}
