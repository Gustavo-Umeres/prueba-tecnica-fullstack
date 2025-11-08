import { gql } from "@apollo/client";

export const GET_OPERACIONES = gql`
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

export const DELETE_OPERACION = gql`
  mutation EliminarOperacion($id: ID!) {
    eliminarOperacion(id: $id)
  }
`;

export const CREATE_OPERACION = gql`
  mutation CrearOperacion($data: OperacionInput!) {
    crearOperacion(data: $data) { id }
  }
`;

export const EDIT_OPERACION = gql`
  mutation EditarOperacion($id: ID!, $data: OperacionInput!) {
    editarOperacion(id: $id, data: $data) { id }
  }
`;