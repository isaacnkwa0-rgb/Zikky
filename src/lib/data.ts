import { prisma } from './prisma';

export async function getHeroSlides() {
  try {
    return await prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  } catch { return []; }
}

export async function getPromoBanners() {
  try {
    return await prisma.promoBanner.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  } catch { return []; }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  } catch { return []; }
}

export async function getProducts(opts?: { categorySlug?: string; featured?: boolean; limit?: number; search?: string }) {
  try {
    return await prisma.product.findMany({
      where: {
        active: true,
        ...(opts?.categorySlug ? { category: { slug: opts.categorySlug } } : {}),
        ...(opts?.featured ? { featured: true } : {}),
        ...(opts?.search ? { name: { contains: opts.search } } : {}),
      },
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { order: 'asc' },
      ...(opts?.limit ? { take: opts.limit } : {}),
    });
  } catch { return []; }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: { select: { name: true, slug: true } } },
    });
  } catch { return null; }
}
