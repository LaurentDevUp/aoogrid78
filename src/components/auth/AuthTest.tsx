import { useCurrentUser, useIsAuthenticated, useRefreshUser } from '@/hooks/useUserQuery';
import { Button } from '@/components/ui/button';

export function AuthTest() {
  const user = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const refreshUser = useRefreshUser();

  const handleRefresh = async () => {
    try {
      await refreshUser();
      console.log('Utilisateur rafraîchi avec succès');
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    }
  };

  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold">Test d'authentification</h2>
      
      <div className="space-y-2">
        <p className="font-medium">État de l'authentification:</p>
        <div className="flex items-center space-x-2">
          <span 
            className={`h-3 w-3 rounded-full ${
              isAuthenticated ? 'bg-green-500' : 'bg-red-500'
            }`} 
          />
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
        <p className="text-sm text-muted-foreground">
          Connectez-vous pour voir les détails de votre compte
        </p>
      )}

      <div className="pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
        >
          Rafraîchir les données
        </Button>
      </div>
    </div>
  );
}

export default AuthTest;
