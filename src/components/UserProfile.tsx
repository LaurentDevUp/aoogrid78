import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

// Composant de bouton de base en attendant d'avoir Shadcn/ui configuré
const Button = ({ 
  onClick, 
  children, 
  variant = 'default' 
}: { 
  onClick: () => void, 
  children: React.ReactNode,
  variant?: 'default' | 'outline'
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors'
  const variantStyles = variant === 'outline' 
    ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    : 'bg-primary text-primary-foreground hover:bg-primary/90'
    
  return (
    <button 
      className={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function UserProfile() {
  const { user, session, loading } = useAuth()

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Non connecté</h2>
        <Button 
          onClick={() => {
            // Rediriger vers la page de connexion
            window.location.href = '/auth/signin'
          }}
        >
          Se connecter
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profil utilisateur</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">ID:</span> {user.id}</p>
        {session?.expires_at && (
          <p>
            <span className="font-medium">Dernière connexion:</span>{' '}
            {new Date(session.expires_at * 1000).toLocaleString()}
          </p>
        )}
      </div>
      <Button 
        variant="outline"
        onClick={async () => {
          try {
            const { error } = await supabase.auth.signOut()
            if (error) {
              console.error('Erreur lors de la déconnexion:', error.message)
              return
            }
            // Recharger la page pour mettre à jour l'état d'authentification
            window.location.reload()
          } catch (error) {
            console.error('Erreur inattendue lors de la déconnexion:', error)
          }
        }}
      >
        Se déconnecter
      </Button>
    </div>
  )
}
