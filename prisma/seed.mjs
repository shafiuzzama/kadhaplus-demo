import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Product (single-product brand)
  const product = await prisma.product.upsert({
    where: { slug: "classic-kadha" },
    update: {},
    create: {
      slug: "classic-kadha",
      name: "KadhaPlus Classic Kadha",
      tagline: "Instant Herbal Kadha Granules",
      category: "Herbal Wellness",
      description:
        "The warm, familiar comfort of traditional Indian kadha — reimagined as instant herbal granules. Just add to a cup and enjoy.",
    },
  });

  // Variants (prices in paise)
  const variants = [
    {
      sku: "KP-CLASSIC-1",
      name: "Single Sachet",
      price: 2000,
      mrp: 2500,
      stock: 500,
      sachets: 1,
      isDefault: false,
    },
    {
      sku: "KP-CLASSIC-5",
      name: "Pack of 5 Sachets",
      price: 8900,
      mrp: 12500,
      stock: 300,
      sachets: 5,
      isDefault: true,
    },
  ];

  for (const v of variants) {
    await prisma.variant.upsert({
      where: { sku: v.sku },
      update: { price: v.price, mrp: v.mrp, stock: v.stock },
      create: { ...v, productId: product.id },
    });
  }

  // Admin user
  const adminPass = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@kadhaplus.com" },
    update: { role: "admin" },
    create: {
      email: "admin@kadhaplus.com",
      name: "KadhaPlus Admin",
      password: adminPass,
      role: "admin",
    },
  });

  // Demo customer
  const custPass = await bcrypt.hash("test1234", 10);
  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Demo Customer",
      password: custPass,
      role: "customer",
    },
  });

  console.log("Seeded product, variants, admin and demo customer.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
