import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthState } from '@/types/auth';

// Clé pour le stockage persistant
const AUTH_STORAGE_KEY = 'auth-storage';

// État initial
const initialState = {
  user: null,
  isLoading: false,
  error: null,
} as const;

// Création du store avec persistance
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Définit l'utilisateur actuel
      setUser: (user: User | null) => {
        set({ user, error: null });
      },
      
      // Déconnexion de l'utilisateur
      signOut: async () => {
        try {
          set({ isLoading: true });
          
          // Ici, vous pouvez ajouter un appel API pour déconnecter l'utilisateur
          // Par exemple avec Supabase: await supabase.auth.signOut();
          
          // Réinitialise l'état
          set({
            user: null,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
          set({
            isLoading: false,
            error: 'Une erreur est survenue lors de la déconnexion',
          });
        }
      },
      
      // Efface les erreurs
      clearError: () => set({ error: null }),
    }),
    {
      name: AUTH_STORAGE_KEY, // clé pour le stockage local
      storage: createJSONStorage(() => localStorage), // utilise localStorage par défaut
      partialize: (state) => ({
        // Ne persiste que l'utilisateur pour éviter de stocker des états temporaires
        user: state.user,
      }),
    }
  )
);

// Hook personnalisé pour accéder facilement à l'utilisateur connecté
export const useCurrentUser = () => {
  return useAuthStore((state) => state.user);
};

// Hook personnalisé pour vérifier si un utilisateur est connecté
export const useIsAuthenticated = () => {
  return useAuthStore((state) => !!state.user);
};

export default useAuthStore;
