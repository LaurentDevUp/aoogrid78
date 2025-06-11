# Authentification avec Supabase et TanStack Query

Ce guide explique comment l'authentification est gérée dans cette application React avec Supabase et TanStack Query.

## Configuration requise

1. Créez un compte sur [Supabase](https://supabase.com/)
2. Créez un nouveau projet
3. Activez l'authentification dans la section "Authentication"
4. Configurez les fournisseurs d'authentification (email/mot de passe, Google, etc.)

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

## Hooks disponibles

### `useUserQuery`

Récupère les informations de l'utilisateur connecté.

```typescript
const { data: user, isLoading, error } = useUserQuery();
```

### `useCurrentUser`

Raccourci pour accéder directement à l'utilisateur connecté.

```typescript
const user = useCurrentUser();
```

### `useIsAuthenticated`

Vérifie si un utilisateur est connecté.

```typescript
const isAuthenticated = useIsAuthenticated();
```

### `useAuthStatus`

Récupère l'état d'authentification avec plus de détails.

```typescript
const { data: isAuthenticated, isLoading, error } = useAuthStatus();
```

### `useRefreshUser`

Force le rafraîchissement des données de l'utilisateur.

```typescript
const refreshUser = useRefreshUser();
// ...
await refreshUser();
```

## Composants

### `UserProfile`

Affiche le profil de l'utilisateur connecté avec un bouton de déconnexion.

### `TestAuth`

Composant de test pour vérifier le bon fonctionnement de l'authentification.

## Gestion des erreurs

Les erreurs d'authentification sont automatiquement journalisées dans la console. Vous pouvez les intercepter en utilisant les états `error` retournés par les hooks.

## Personnalisation

Pour ajouter des champs personnalisés au profil utilisateur, modifiez le type `User` dans `src/types/auth.ts` et mettez à jour la fonction de mappage dans `useUserQuery`.
