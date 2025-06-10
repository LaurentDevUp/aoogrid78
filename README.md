# Application React avec Vite, TypeScript, TailwindCSS et Supabase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Une application web moderne développée avec React 18, Vite, TypeScript, TailwindCSS et Supabase.

## 🚀 Fonctionnalités

- ⚡ Développement ultra-rapide avec Vite
- 🔒 Authentification sécurisée avec Supabase
- 🎨 Interface utilisateur moderne avec TailwindCSS
- 🔄 Typage fort avec TypeScript
- 🛠 Configuration optimisée pour le développement et la production

## 📦 Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn
- Compte Supabase ([inscrivez-vous ici](https://app.supabase.com/))

## 🛠 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/LaurentDevUp/aoogrid78.git
   cd aoogrid78
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
   ```

   > **Note** : Obtenez ces valeurs dans les paramètres de votre projet Supabase (Project Settings > API)

4. **Démarrer l'application en mode développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173)

## 🏗 Structure du projet

```
├── src/
│   ├── components/     # Composants réutilisables
│   ├── contexts/       # Contextes React (comme l'authentification)
│   ├── lib/           # Utilitaires et configurations
│   ├── App.tsx        # Composant racine de l'application
│   ├── main.tsx       # Point d'entrée de l'application
│   └── index.css      # Styles globaux
├── .env.example      # Exemple de fichier d'environnement
├── index.html        # Point d'entrée HTML
├── package.json      # Dépendances et scripts
├── tailwind.config.js # Configuration de TailwindCSS
└── vite.config.ts    # Configuration de Vite
```

## 🚀 Déploiement

### Préparer pour la production
```bash
npm run build
# ou
yarn build
```

### Vérifier la version de production localement
```bash
npm run preview
# ou
yarn preview
```

### Déploiement sur Vercel (recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLaurentDevUp%2Faoogrid78&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Configure%20your%20Supabase%20credentials&envLink=https%3A%2F%2Fgithub.com%2FLaurentDevUp%2Faoogrid78%23%EF%B8%8F-pr%C3%A9requis)

1. Cliquez sur le bouton ci-dessus
2. Ajoutez vos variables d'environnement dans les paramètres du projet Vercel
3. Cliquez sur "Deploy"

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<p align="center">
  Fait avec ❤️ par LaurentDevUp
</p>
