import { useCurrentUser, useIsAuthenticated } from '@/hooks/useUserQuery';

/**
 * Composant de test pour vérifier l'intégration de l'authentification
 * Affiche des informations sur l'utilisateur connecté et l'état d'authentification
 */
export function TestAuth() {
  const user = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="space-y-4 rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Test d'authentification</h2>
      
      <div className="space-y-2">
        <p className="font-medium">État de l'authentification:</p>
        <div className="flex items-center space-x-2">
          <span className={`h-3 w-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isAuthenticated ? 'Connecté' : 'Non connecté'}</span>
        </div>
      </div>
      
      {isAuthenticated && user ? (
        <div className="space-y-2">
          <p className="font-medium">Informations utilisateur:</p>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">ID:</span> {user.id}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            {user.user_metadata?.full_name && (
              <p><span className="font-medium">Nom complet:</span> {user.user_metadata.full_name}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">Connectez-vous pour voir les détails de votre compte</p>
      )}
      
      <div className="pt-4">
        <p className="text-xs text-gray-500">
          Ce composant utilise les hooks personnalisés useCurrentUser et useIsAuthenticated
        </p>
      </div>
    </div>
  );
}

export default TestAuth;
