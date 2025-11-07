-- CreateTable
CREATE TABLE "Planta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Operacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "plantaId" INTEGER NOT NULL,
    CONSTRAINT "Operacion_plantaId_fkey" FOREIGN KEY ("plantaId") REFERENCES "Planta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CostoIndirecto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rango" TEXT NOT NULL,
    "costo" REAL NOT NULL,
    "operacionId" INTEGER NOT NULL,
    CONSTRAINT "CostoIndirecto_operacionId_fkey" FOREIGN KEY ("operacionId") REFERENCES "Operacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
