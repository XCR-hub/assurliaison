# AssurLiaison

AssurLiaison est une marketplace d'annonces permettant de mettre en relation les vendeurs et les acheteurs de portefeuilles d'assurance (courtiers, agents généraux et mandataires). Le site agit uniquement comme intermédiaire d'annonces : aucun conseil ou exécution de transaction n'est fourni. Les utilisateurs peuvent rechercher des portefeuilles selon des filtres précis, publier des annonces, échanger via une messagerie privée et recevoir des alertes e‑mail lorsque de nouvelles annonces correspondent à leurs critères.

## Fonctionnalités principales (MVP)

* Listing public des annonces avec informations limitées pour les invités et complètes pour les abonnés.
* Paywall Stripe avec deux plans : **199 €/mois** et **1 500 €/an**.
* Messagerie privée 1:1 buyer↔seller (à implémenter).
* Workflow de publication d'annonce avec validation par un administrateur.
* Alertes e‑mail sur recherches sauvegardées (INSTANT / DAILY / WEEKLY).
* Section Admin pour l'approbation des annonces et la modération des messages.
* SEO complet : métadonnées dynamiques, sitemap, robots.txt, Open Graph, schema.org.
* Branding personnalisé (nom, logo, palette de couleurs) – ici « AssurLiaison ».

## Structure du projet

```
assurliaison/
  prisma/
    schema.prisma        # schéma de la base de données Prisma
    seed.ts              # script de seed pour créer des données de démo
  src/
    app/
      (marketing)/page.tsx            # page d'accueil marketing
      annonces/page.tsx               # listing des annonces approuvées
      annonces/[slug]/page.tsx        # détail d'une annonce par slug
      nouvelle-annonce/page.tsx       # (placeholder) création d'une annonce
      api/health/route.ts             # route de santé pour tests
      layout.tsx                      # layout racine avec métadonnées
      globals.css                     # styles globaux tailwind
    lib/
      db.ts                           # initialisation Prisma (WASM)
      stripe.ts                       # initialisation Stripe
  .env.example
  README.md
  package.json
  tsconfig.json
  next.config.js
  tailwind.config.ts
  postcss.config.js
```

### Prisma en mode WASM

Prisma fonctionne en WebAssembly pour permettre un déploiement sur des environnements serverless comme Vercel. Pour forcer le moteur WASM :

* Dans `schema.prisma`, le générateur client est défini avec `engineType = "wasm"`.
* Dans `.env.example`, la variable `PRISMA_CLIENT_ENGINE_TYPE` est positionnée à `wasm`.
* Le client Prisma est initialisé côté serveur uniquement dans `src/lib/db.ts` à l'aide de `import 'server-only'`.
* Aucune importation de `@prisma/client` ne doit être faite dans du code client (`use client`).

### Installation locale

1. Assurez‑vous d'avoir Node .js >= 18 et un serveur PostgreSQL disponible.
2. Clonez ce dépôt et copiez le fichier `.env.example` vers `.env` en remplissant les variables (base de données, clés Stripe, NextAuth, etc.).
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Exécutez les migrations et générez le client Prisma :
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Seed de données de démo (facultatif mais recommandé pour tester le listing) :
   ```bash
   npm run seed
   ```
6. Lancez l'application en développement :
   ```bash
   npm run dev
   ```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000). La route `/api/health` doit retourner `{ ok: true, listingCount: 12 }` si vous avez exécuté le seed.

### Déploiement sur Vercel

Pour déployer sur Vercel :

1. Configurez un nouveau projet Vercel et connectez‑le au dépôt Git contenant ce projet.
2. Dans les variables d'environnement Vercel, ajoutez toutes les variables présentes dans `.env.example` (notamment `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXTAUTH_SECRET`, etc.).
3. Activez la connexion Postgres gérée (p. ex. Neon) et mettez à jour `DATABASE_URL` en conséquence.
4. Déployez. Vercel détectera automatiquement le projet Next.js et exécutera `prisma generate` pour générer le client WASM.

### Webhooks Stripe

Créez deux produits/prix dans le Dashboard Stripe :

* **pro_monthly_199** – 199 € / mois
* **year_1500** – 1 500 € / an

Assurez‑vous que les webhooks Stripe suivants pointent vers votre site :

* `checkout.session.completed`
* `customer.subscription.updated`
* `invoice.payment_failed`

La route API `/api/stripe/webhook` devra être implémentée pour mettre à jour les abonnements dans la table `Subscription` et attribuer le rôle approprié au `User`.

### RGPD et légal

En tant qu'intermédiaire d'annonces, le site doit afficher des mentions légales, des conditions d'utilisation, une politique de confidentialité et offrir la possibilité d'exporter ou de supprimer les données personnelles. Ces pages ne sont pas encore implémentées et doivent être ajoutées avant la mise en production.

### Tests de santé

Utilisez la route `/api/health` pour vérifier que l'application répond et que Prisma est configuré correctement. Un simple test de fumée peut être écrit avec Playwright pour s'assurer que les pages principales rendent un code 200 et que le paywall est présent pour un invité.