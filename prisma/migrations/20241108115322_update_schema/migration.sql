/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Furniture` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Furniture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "categoryId" INTEGER,
    "averageRating" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "Furniture_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Furniture" ("averageRating", "categoryId", "description", "id", "name", "price") SELECT "averageRating", "categoryId", "description", "id", "name", "price" FROM "Furniture";
DROP TABLE "Furniture";
ALTER TABLE "new_Furniture" RENAME TO "Furniture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
