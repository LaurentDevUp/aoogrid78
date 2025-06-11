import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { User } from '@/types/auth';
import { supabase } from '@/lib/supabase';

// Types pour le store
type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

type AuthStore = AuthState & AuthActions;

// Clé pour le stockage persistant
const AUTH_STORAGE_KEY = 'auth-storage';

// Création du store avec persistance
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // État initial
      user: null,
      isLoading: false,
      error: null,

      // Définit l'utilisateur actuel
      setUser: (user) => set({ user, error: null }),

      // Connexion de l'utilisateur
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            const userPayload: User = {
              id: data.user.id,
              email: data.user.email || '',
              user_metadata: data.user.user_metadata,
            };
            set({ user: userPayload, error: null });
          } else {
            throw new Error('Aucun utilisateur retourné après la connexion.');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Une erreur est survenue lors de la connexion';
          set({ error: errorMessage });
          throw error; // Propagate error
        } finally {
          set({ isLoading: false });
        }
      },

      // Déconnexion de l'utilisateur
      // Inscription d'un nouvel utilisateur
      signUp: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            const userPayload: User = {
              id: data.user.id,
              email: data.user.email || '',
              user_metadata: data.user.user_metadata,
            };
            set({ user: userPayload, error: null });
          } else {
            throw new Error('Aucun utilisateur retourné après l\'inscription.');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
          set({ error: errorMessage });
          throw error; // Propagate error
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, error: null });
        } catch (error: any) {
          const errorMessage = error.message || 'Une erreur est survenue lors de la déconnexion';
          set({ error: errorMessage });
          throw error; // Propage l'erreur pour une gestion dans le composant appelant
        } finally {
          set({ isLoading: false });
        }
      },

      // Efface les erreurs
      clearError: () => set({ error: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => Promise.resolve(null),
          setItem: () => Promise.resolve(),
          removeItem: () => Promise.resolve(),
        } as StateStorage;
      }),
      // Ne persister que l'utilisateur, pas l'état de chargement ni les erreurs
      partialize: (state) => ({
        user: state.user,
      }),
      // Gestion des erreurs de désérialisation
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Création d'un nouvel état avec les valeurs réinitialisées
          return {
            ...state,
            error: null,
            isLoading: false
          };
        }
      },
    }
  )
);

// Hook personnalisé pour accéder facilement à l'utilisateur connecté
export const useCurrentUser = (): User | null => {
  return useAuthStore((state) => state.user);
};

// Hook personnalisé pour vérifier si un utilisateur est connecté
export const useIsAuthenticated = (): boolean => {
  return useAuthStore((state) => !!state.user);
};

// Hook personnalisé pour accéder à l'état de chargement
export const useAuthLoading = (): boolean => {
  return useAuthStore((state) => state.isLoading);
};

export default useAuthStore;
