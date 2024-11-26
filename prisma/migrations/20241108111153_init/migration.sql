-- CreateTable
CREATE TABLE "Furniture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "categoryId" INTEGER,
    "imageUrl" TEXT,
    "averageRating" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Furniture_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FurnitureImages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "furnitureId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    CONSTRAINT "FurnitureImages_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "furnitureId" INTEGER NOT NULL,
    "reviewerName" TEXT,
    "reviewText" TEXT,
    "email" TEXT,
    "rating" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reviews_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "FurnitureImages_furnitureId_idx" ON "FurnitureImages"("furnitureId");

-- CreateIndex
CREATE INDEX "Reviews_furnitureId_idx" ON "Reviews"("furnitureId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
