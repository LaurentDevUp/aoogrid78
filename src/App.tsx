import { UserProfile } from './components/UserProfile'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Mon Application React</h1>
          <div className="flex items-center space-x-4">
            {/* Vous pouvez ajouter une navigation ici */}
          </div>
        </div>
      </header>
      <main className="container py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold">Bienvenue sur mon application</h2>
            <p className="text-muted-foreground">
              Ceci est une application React moderne avec TypeScript, Vite, TailwindCSS, Shadcn/ui et Supabase.
            </p>
          </div>
          
          {/* Section de profil utilisateur */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <UserProfile />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
