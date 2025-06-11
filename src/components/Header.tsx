import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="AooGrid Logo" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-xl font-bold">AooGrid</span>
          </Link>
        </div>
        
        {/* CTAs */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link to="/register">S'inscrire</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
