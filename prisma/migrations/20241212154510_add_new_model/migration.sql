/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FurnitureImage` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "totalAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "furnitureId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FurnitureImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "furnitureId" INTEGER NOT NULL,
    CONSTRAINT "FurnitureImage_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FurnitureImage" ("furnitureId", "id", "url") SELECT "furnitureId", "id", "url" FROM "FurnitureImage";
DROP TABLE "FurnitureImage";
ALTER TABLE "new_FurnitureImage" RENAME TO "FurnitureImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
