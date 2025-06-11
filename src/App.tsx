import { Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import { AuthTest } from './components/auth/AuthTest';
import { Header } from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <main className="container py-8">
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Section d'accueil */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-3xl font-bold text-primary">Bienvenue sur Grid78</h2>
                <p className="mb-6 text-lg font-medium">Prenez de la hauteur !!!</p>
                <p className="mb-4 text-muted-foreground">
                  Notre interface intuitive, vous permet de :
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="font-medium">Gérer vos missions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="font-medium">Suivi des télépilotes et formation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="font-medium">Gestion du planning de votre équipe</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="font-medium">Gestion du matériels</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    <span className="font-medium">Gagner en productivité</span>
                  </li>
                </ul>
              </div>
              
              {/* Section de test d'authentification */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">Test d'authentification</h2>
                  <AuthTest />
                </div>
                
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-semibold">État de la session</h2>
                  <UserProfile />
                </div>
              </div>
              
              {/* Section de profil utilisateur */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Profil Utilisateur</h2>
                <UserProfile />
              </div>
            </div>
          </main>
        } />
      </Routes>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mon Application. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
