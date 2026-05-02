-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "headlineMain" TEXT NOT NULL,
    "headlineAccent" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "cta" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "fadeColor" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "labelBg" TEXT NOT NULL,
    "btnBg" TEXT NOT NULL,
    "btnHover" TEXT NOT NULL,
    "btnShadow" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PromoBanner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "cta" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
