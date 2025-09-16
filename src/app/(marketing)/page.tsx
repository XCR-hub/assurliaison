import Link from 'next/link';

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
        La marketplace des portefeuilles d'assurance
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        Achetez ou vendez des portefeuilles d'assurance en toute sécurité. Accédez à un large
        réseau de professionnels : courtiers, agents généraux et mandataires.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/annonces"
          className="inline-block px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Voir les annonces
        </Link>
        <Link
          href="/nouvelle-annonce"
          className="inline-block px-6 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Publier une annonce
        </Link>
      </div>
    </main>
  );
}