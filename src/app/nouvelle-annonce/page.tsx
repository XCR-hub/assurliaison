import Link from 'next/link';

/**
 * Page de création d'une nouvelle annonce. Une véritable implémentation
 * comporterait un wizard multi-étapes avec validation et enregistrement en
 * base via une action serveur. Ici, nous affichons simplement un message
 * indiquant que la fonctionnalité est à venir.
 */
export default function NewListingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Publier une annonce</h1>
      <p className="text-gray-700">
        L'assistant de création d'annonce sera disponible dans une prochaine version. Vous pourrez
        saisir toutes les informations nécessaires concernant votre portefeuille, ajouter des KPIs
        et soumettre votre annonce pour validation par notre équipe.
      </p>
      <Link href="/annonces" className="text-blue-600 hover:underline">
        Retour aux annonces
      </Link>
    </div>
  );
}