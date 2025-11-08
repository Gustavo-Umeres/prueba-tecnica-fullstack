import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    plantas: async () => prisma.planta.findMany(),
    operaciones: async (_, { plantaId }) =>
      prisma.operacion.findMany({
        where: { plantaId: Number(plantaId) },
        include: { costosIndirectos: true },
        orderBy: { id: "asc" },
      }),
  },
  Mutation: {
    crearOperacion: async (_, { data }) => {
      return prisma.operacion.create({
        data: {
          nombre: data.nombre,
          plantaId: Number(data.plantaId),
          costosIndirectos: {
            create: data.costosIndirectos.map((c) => ({
              rango: c.rango,
              costo: c.costo,
            })),
          },
        },
        include: { costosIndirectos: true },
      });
    },
    editarOperacion: async (_, { id, data }) => {
      await prisma.costoIndirecto.deleteMany({ where: { operacionId: Number(id) } });
      return prisma.operacion.update({
        where: { id: Number(id) },
        data: {
          nombre: data.nombre,
          costosIndirectos: {
            create: data.costosIndirectos.map((c) => ({
              rango: c.rango,
              costo: c.costo,
            })),
          },
        },
        include: { costosIndirectos: true },
      });
    },
    eliminarOperacion: async (_, { id }) => {
      await prisma.costoIndirecto.deleteMany({ where: { operacionId: Number(id) } });
      await prisma.operacion.delete({ where: { id: Number(id) } });
      return true;
    },
  },
};
