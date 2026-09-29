import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { STOREFRONT_HIDDEN_CATEGORY_IDS } from "@/lib/storefront/constants";

export type NavCategory = {
  id: string;
  name: string;
};

async function loadNavCategories(): Promise<NavCategory[]> {
  return prisma.category.findMany({
    where: {
      isActive: true,
      id: { notIn: [...STOREFRONT_HIDDEN_CATEGORY_IDS] },
    },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getNavCategories(): Promise<NavCategory[]> {
  return unstable_cache(loadNavCategories, ["storefront-nav-categories"], {
    tags: ["categories"],
    revalidate: 300,
  })();
}
