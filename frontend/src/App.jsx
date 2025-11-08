import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from "@apollo/client";
import SidebarNav from "./components/SidebarNav";
import PlantaSelect from "./components/PlantaSelect";
import CostosModule from "./components/CostosModule";
import OperationModal from "./components/OperationModal";
import LindcorpLogo from "./assets/Lindcorp.png";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const menuItems = [
  "Precios Base",
  "Waste",
  "Costos indirectos",
  "Tipo de Cliente",
  "Comisiones",
  "Tipos de cambio",
  "Tasa financiera anual",
  "Logística",
];

const GET_OPERACIONES = gql`
  query GetOperaciones($plantaId: ID!) {
    operaciones(plantaId: $plantaId) {
      id
      nombre
      costosIndirectos {
        id
        rango
        costo
      }
    }
  }
`;

const DELETE_OPERACION = gql`
  mutation EliminarOperacion($id: ID!) {
    eliminarOperacion(id: $id)
  }
`;

function AppContainer() {
  const [selectedPlanta, setSelectedPlanta] = useState(1);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Costos indirectos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("new");
  const [selectedOperationId, setSelectedOperationId] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_OPERACIONES, {
    variables: { plantaId: String(selectedPlanta) },
    fetchPolicy: "network-only",
  });

  const [eliminarOperacion] = useMutation(DELETE_OPERACION, {
    onCompleted: () => {
      refetch();
      setSelectedOperationId(null);
    },
  });

  useEffect(() => {
    setSelectedOperationId(null);
  }, [selectedPlanta]);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedOperationId) return;
    if (!confirm("¿Está seguro de eliminar esta operación?")) return;
    eliminarOperacion({ variables: { id: selectedOperationId } });
  };

  const selectedOperation = data?.operaciones.find((op) => op.id === selectedOperationId);
  const isButtonDisabled = !selectedOperationId;
  const isCostosModule = selectedMenuItem === "Costos indirectos";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white border-b border-gray-300 flex flex-shrink-0">
        <div className="w-64 flex-shrink-0 border-r border-gray-200 flex items-center justify-center p-4 shadow-md z-10">
          <img src={LindcorpLogo} alt="Lindcorp Logo" className="h-8 object-contain" />
        </div>
        <div className="flex-1 flex items-center p-4">
          <div className={!isCostosModule ? "invisible" : "flex gap-3"}>
            <button
              onClick={() => handleOpenModal("new")}
              className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              Agregar
            </button>
            <button
              onClick={() => handleOpenModal("edit")}
              disabled={isButtonDisabled}
              className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={isButtonDisabled}
              className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0 shadow-md z-10 overflow-y-auto">
          <PlantaSelect selectedPlanta={selectedPlanta} onSelectPlanta={setSelectedPlanta} />
          <SidebarNav items={menuItems} selected={selectedMenuItem} onSelect={setSelectedMenuItem} />
        </div>

        <main className="flex-1 px-6 py-4 bg-white overflow-hidden">
          {selectedMenuItem === "Costos indirectos" ? (
            <CostosModule
              loading={loading}
              error={error}
              operaciones={data?.operaciones || []}
              selectedOperationId={selectedOperationId}
              onRowClick={setSelectedOperationId}
            />
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Módulo: {selectedMenuItem}</h2>
              <p className="text-gray-500 mt-2">Esta sección aún no ha sido implementada.</p>
            </div>
          )}
        </main>
      </div>

      <OperationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          refetch();
          setIsModalOpen(false);
          setSelectedOperationId(null);
        }}
        mode={modalMode}
        operationData={modalMode === "edit" ? selectedOperation : null}
        plantaId={selectedPlanta}
      />
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
