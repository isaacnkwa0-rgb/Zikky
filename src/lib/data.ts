import { prisma } from './prisma';

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

export async function getPromoBanners() {
  return prisma.promoBanner.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

export async function getProducts(opts?: { categorySlug?: string; featured?: boolean; limit?: number; search?: string }) {
  return prisma.product.findMany({
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
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { name: true, slug: true } } },
  });
}
