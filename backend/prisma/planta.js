import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.planta.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nombre: "Perú",
      operaciones: {
        create: [
          {
            nombre: "Impresión",
            costosIndirectos: {
              create: [
                { rango: "300kg", costo: 0.015 },
                { rango: "500kg", costo: 0.015 },
                { rango: "1T", costo: 15.0 },
                { rango: "3T", costo: 10.0 },
                { rango: "5T", costo: 8.0 },
                { rango: "10T", costo: 7.0 },
                { rango: "20T", costo: 5.0 },
                { rango: "30T", costo: 4.8 }
              ]
            }
          },
          {
            nombre: "Laminado",
            costosIndirectos: {
              create: [
                { rango: "300kg", costo: 15.0 },
                { rango: "500kg", costo: 15.0 },
                { rango: "1T", costo: 15.0 },
                { rango: "3T", costo: 10.0 },
                { rango: "5T", costo: 8.0 },
                { rango: "10T", costo: 7.0 },
                { rango: "20T", costo: 5.0 },
                { rango: "30T", costo: 4.8 }
              ]
            }
          },
          {
            nombre: "Embolsado",
            costosIndirectos: {
              create: [
                { rango: "300kg", costo: 15.0 },
                { rango: "500kg", costo: 15.0 },
                { rango: "1T", costo: 15.0 },
                { rango: "3T", costo: 10.0 },
                { rango: "5T", costo: 8.0 },
                { rango: "10T", costo: 7.0 },
                { rango: "20T", costo: 5.0 },
                { rango: "30T", costo: 4.8 }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.planta.upsert({
    where: { id: 2 },
    update: {},
    create: { nombre: "México" }
  });

  await prisma.planta.upsert({
    where: { id: 3 },
    update: {},
    create: { nombre: "España" } 
  });

  console.log("Planta completada");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
