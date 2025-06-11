import { useUserQuery } from '@/hooks/useUserQuery';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from './ui/LoadingSpinner';

// Composant de bouton temporaire en attendant d'avoir la configuration UI complète
const Button = ({ 
  onClick, 
  children, 
  variant = 'default',
  className = ''
}: { 
  onClick: () => void, 
  children: React.ReactNode,
  variant?: 'default' | 'outline',
  className?: string
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantStyles = variant === 'outline' 
    ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
    : 'bg-blue-600 text-white hover:bg-blue-700';
    
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default function UserProfile() {
  const { data: user, isLoading, error } = useUserQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erreur lors du chargement du profil: {error.message}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-bold">Profil non connecté</h2>
        <p>Veuillez vous connecter pour voir votre profil</p>
        <Button 
          onClick={() => {
            // Rediriger vers la page de connexion
            window.location.href = '/login';
          }}
        >
          Se connecter
        </Button>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Profil Utilisateur</h2>
        <div className="flex items-center space-x-4">
          {user.user_metadata?.avatar_url && (
            <img 
              src={user.user_metadata.avatar_url} 
              alt="Profil" 
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold">
              {user.user_metadata?.full_name || user.email}
            </h3>
            {user.user_metadata?.username && (
              <p className="text-gray-600">@{user.user_metadata.username}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informations du compte</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          {user.user_metadata?.full_name && (
            <p><span className="font-medium">Nom complet:</span> {user.user_metadata.full_name}</p>
          )}
          <p><span className="font-medium">Compte créé le:</span> {new Date(user.created_at || '').toLocaleDateString()}</p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleSignOut}
      >
        Se déconnecter
      </Button>
    </div>
  );
}
