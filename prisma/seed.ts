import { prisma } from '../src/lib/db';

async function main() {
  // Seed at least one seller and one buyer
  const seller = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      email: 'seller@example.com',
      name: 'Vendeur Démo',
      role: 'SELLER'
    }
  });
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      name: 'Acheteur Démo',
      role: 'BUYER'
    }
  });
  // Create demo listings across several regions and multiples (1.8–3.2x)
  const regions = ['Île-de-France', 'Auvergne–Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie'];
  const lines = ['IARD', 'Santé', 'Vie', 'Épargne', 'Pro', 'Auto', 'Habitation'];
  const multiples = [1.8, 2.0, 2.2, 2.5, 2.8, 3.0, 3.2];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    await prisma.listing.upsert({
      where: { slug: `demo-annonce-${i + 1}` },
      update: {},
      create: {
        sellerId: seller.id,
        status: 'APPROVED',
        title: `Portefeuille ${i + 1}`,
        slug: `demo-annonce-${i + 1}`,
        region: regions[i % regions.length],
        lines: [lines[i % lines.length]],
        portfolioType: i % 2 === 0 ? 'Partiel' : 'Total',
        nbClients: 50 + i * 5,
        annualCommissionsEUR: 50000 + i * 5000,
        mainCarriers: ['Confidentiel'],
        growth3yPct: 5 + i,
        askingPriceEUR: (50000 + i * 5000) * multiples[i % multiples.length],
        priceMultiple: multiples[i % multiples.length],
        transitionTerms: 'À négocier',
        anonymized: true,
        shortDesc: 'Portefeuille dynamique avec clientèle fidèle.',
        longDesc: 'Ce portefeuille se compose de divers contrats IARD et Vie avec un historique de croissance solide sur les trois dernières années.',
        createdAt: new Date(now.getTime() - i * 86400000),
        updatedAt: new Date(now.getTime() - i * 86400000)
      }
    });
  }
  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });