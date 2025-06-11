import React from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';

// Fonction pour récupérer l'utilisateur actuel via Supabase
async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
    
    if (!data.user) return null;
    
    // Convertir le type de Supabase vers notre type User
    const user = data.user;
    return {
      id: user.id,
      email: user.email || '', // Garantir que email n'est jamais undefined
      user_metadata: user.user_metadata || {},
      app_metadata: user.app_metadata || {},
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  } catch (error) {
    console.error('Erreur dans getCurrentUser:', error);
    throw error;
  }
}

// Hook personnalisé pour récupérer l'utilisateur
export function useUserQuery() {
  const queryOptions: UseQueryOptions<User | null, Error> = {
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false
  };

  const query = useQuery<User | null, Error>(queryOptions);

  // Gestion des erreurs avec un effet
  React.useEffect(() => {
    if (query.error) {
      console.error('Erreur dans useUserQuery:', query.error);
    }
  }, [query.error]);

  return query;
}

// Hook pour vérifier l'état d'authentification
export function useAuthStatus() {
  return useQuery<boolean, Error>({
    queryKey: ['authStatus'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erreur lors de la vérification de la session:', error);
          throw error;
        }
        
        return !!data.session?.user;
      } catch (error) {
        console.error('Erreur dans useAuthStatus:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

// Hook utilitaire pour accéder à l'utilisateur actuel
export function useCurrentUser() {
  const { data: user } = useUserQuery();
  return user;
}

// Hook utilitaire pour vérifier si l'utilisateur est authentifié
export function useIsAuthenticated() {
  const { data: isAuthenticated } = useAuthStatus();
  return isAuthenticated || false;
}

// Hook utilitaire pour forcer le rafraîchissement de l'utilisateur
export function useRefreshUser() {
  const queryClient = useQueryClient();
  
  return async () => {
    await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  };
}
