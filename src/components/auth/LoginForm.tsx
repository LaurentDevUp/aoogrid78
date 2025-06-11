import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// 1. Définition du schéma de validation avec Zod
const loginSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // 2. Initialisation de React Hook Form avec validation Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 3. Gestion de la soumission du formulaire
  const onSubmit = async (data: LoginFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        // 4. Gestion des erreurs d'authentification
        if (error.message.includes('Invalid login credentials')) {
          setError('root', {
            type: 'manual',
            message: 'Identifiants incorrects. Veuillez réessayer.',
          });
        } else {
          throw error;
        }
      } else {
        // Connexion réussie
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté.',
        });
        // Redirection vers la page d'accueil ou le tableau de bord
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.',
      });
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-muted-foreground">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Affichage des erreurs globales */}
        {errors.root && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {errors.root.message}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <a
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className={errors.password ? 'border-destructive' : ''}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Pas encore de compte ?{' '}
        <a href="/register" className="font-medium text-primary hover:underline">
          Créer un compte
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
