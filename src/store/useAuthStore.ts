import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/auth';

// Types pour le store
type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  clearError: () => void;
};

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
          set({ isLoading: true });
          
          // Ici, vous pouvez ajouter la logique de déconnexion spécifique
          // Par exemple, avec Supabase : await supabase.auth.signOut();
          
          // Réinitialisation de l'état
          set({ user: null, error: null });
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
          set({ 
            error: error instanceof Error 
              ? error.message 
              : 'Une erreur est survenue lors de la déconnexion' 
          });
        } finally {
          set({ isLoading: false });
        }
      },
      
      // Efface les erreurs
      clearError: () => set({ error: null }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Ne persister que l'utilisateur, pas l'état de chargement ni les erreurs
      partialize: (state) => ({
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
