const DragHandleIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-3 text-gray-400 cursor-grab"
  >
    <path
      fill="currentColor"
      d="M5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
);

const RANGOS_FIJOS = ["300 kg", "500 kg", "1 T", "3 T", "5 T", "10 T", "20 T", "30 T"];

const DEFAULT_COSTOS_ROW = {
  "300 kg": 15.0,
  "500 kg": 15.0,
  "1 T": 15.0,
  "3 T": 10.0,
  "5 T": 8.0,
  "10 T": 7.0,
  "20 T": 5.0,
  "30 T": 4.8,
};

const MAX_EMPTY_ROWS = 11;

export default function CostosModule({ loading, error, operaciones, selectedOperationId, onRowClick }) {
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const dataRows = operaciones || [];
  const emptyRowCount = Math.max(0, MAX_EMPTY_ROWS - dataRows.length);

  return (
    <div className="overflow-hidden flex flex-col h-full">
      <div className="overflow-y-auto border border-gray-200 rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-white sticky top-0 z-20">
              <th className="p-3 text-left font-semibold sticky left-0 bg-gray-800 z-30 min-w-[250px]">
                Operación
              </th>
              {RANGOS_FIJOS.map((rango) => (
                <th
                  key={rango}
                  className="p-3 text-center **text-gray-700 font-semibold** border-l border-gray-200"
                  >
                  {rango}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((op) => {
              const costMap = new Map(op.costosIndirectos.map((c) => [c.rango, c.costo]));
              const isSelected = op.id === selectedOperationId;
              return (
                <tr
                  key={op.id}
                  onClick={() => onRowClick(isSelected ? null : op.id)}
                  className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    isSelected ? "row-selected" : ""
                  }`}
                >
                  <td
                    className={`p-3 font-medium text-gray-900 sticky left-0 bg-white z-10 sticky-cell ${
                      isSelected ? "row-selected" : "hover:bg-gray-50"
                    }`}
                  >
                    <DragHandleIcon />
                    {op.nombre}
                  </td>
                  {RANGOS_FIJOS.map((rango) => (
                    <td key={rango} className="p-3 text-center **text-gray-900 font-bold** border-l border-gray-200">
                      {costMap.has(rango)
                        ? costMap.get(rango).toFixed(costMap.get(rango) === 0.015 ? 3 : 2)
                        : "0.00"}
                    </td>
                  ))}
                </tr>
              );
            })}

            {[...Array(emptyRowCount)].map((_, index) => (
              <tr key={`dummy-${index}`} className="border-b border-gray-200">
                <td className="p-3 font-medium text-gray-400 sticky left-0 bg-white z-10">
                  <DragHandleIcon />
                  ...
                </td>
                {RANGOS_FIJOS.map((rango) => (
                  <td
                    key={rango}
                    className="p-3 text-center **text-gray-600 font-semibold** border-l border-gray-200"
                  >
                    {DEFAULT_COSTOS_ROW[rango].toFixed(DEFAULT_COSTOS_ROW[rango] === 0.015 ? 3 : 2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
