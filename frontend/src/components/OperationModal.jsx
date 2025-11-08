import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_OPERACION, EDIT_OPERACION } from "../graphql/operations";
import { RANGOS_FIJOS, getInitialFormState } from "../constants/config";

const initializeState = (mode, operationData) => {
  if (mode === "edit" && operationData) {
    const costosMap = operationData.costosIndirectos.reduce((acc, costo) => {
      acc[costo.rango] = costo.costo;
      return acc;
    }, {});
    return { nombre: operationData.nombre, costos: costosMap };
  }
  return getInitialFormState();
};

export default function OperationModal({ isOpen, onClose, onSave, mode, operationData, plantaId }) {
  const [crearOperacion, { loading: creating }] = useMutation(CREATE_OPERACION);
  const [editarOperacion, { loading: editing }] = useMutation(EDIT_OPERACION);

  const [formState, setFormState] = useState(() => initializeState(mode, operationData));

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleCostoChange = (rango, value) => {
    setFormState((prev) => ({
      ...prev,
      costos: { ...prev.costos, [rango]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.nombre.trim()) return alert("Ingrese nombre de operación");

    const costosInput = RANGOS_FIJOS.map((rango) => ({
      rango: rango,
      costo: parseFloat(formState.costos[rango] || 0),
    }));

    const inputData = {
      nombre: formState.nombre,
      plantaId: String(plantaId),
      costosIndirectos: costosInput,
    };

    try {
      if (mode === "edit") {
        await editarOperacion({ variables: { id: operationData.id, data: inputData } });
      } else {
        await crearOperacion({ variables: { data: inputData } });
      }
      onSave();
    } catch (err) {
      console.error("Error guardando operación:", err);
      alert("Error al guardar: " + err.message);
    }
  };

  if (!isOpen) return null;

  const isLoading = creating || editing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Editar Operación" : "Nueva Operación"}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Operación</label>
            <input
              type="text"
              placeholder="Ej: Impresión"
              value={formState.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full max-w-sm p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            {RANGOS_FIJOS.map((rango) => (
              <div key={rango}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{rango}</label>
                <input
                  type="number"
                  step="0.001"
                  value={formState.costos[rango] || ""}
                  onChange={(e) => handleCostoChange(rango, e.target.value)}
                  className="cell-input"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}