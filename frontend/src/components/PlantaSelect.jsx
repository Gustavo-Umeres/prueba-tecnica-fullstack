export default function PlantaSelect({ selectedPlanta, onSelectPlanta }) {
  const plantas = [
    { id: 1, nombre: "Perú (planta)" },
    { id: 2, nombre: "México (planta)" },
    { id: 3, nombre: "España (planta)" },
  ];

  return (
    <div className="mb-6">
      <select
        value={selectedPlanta}
        onChange={(e) => onSelectPlanta(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {plantas.map((planta) => (
          <option key={planta.id} value={planta.id}>
            {planta.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}