export const runtime = 'nodejs';

import { prisma } from '@/src/lib/db';

export async function GET() {
  try {
    const count = await prisma.listing.count();
    return Response.json({ ok: true, listingCount: count });
  } catch (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}