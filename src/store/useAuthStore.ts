import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { User } from '@/types/auth';

// Types pour le store
type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
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
      
      // Déconnexion de l'utilisateur
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Ici, vous pouvez ajouter la logique de déconnexion spécifique
          // Par exemple, avec Supabase : await supabase.auth.signOut();
          
          // Réinitialisation de l'état
          set({ user: null, error: null });
          
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
          
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Une erreur est survenue lors de la déconnexion';
            
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
