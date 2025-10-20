import axios, { AxiosError } from "axios";

/**
 * Clase personalizada para errores de API
 * Extiende Error con información adicional del estado HTTP
 */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Maneja errores de axios de manera centralizada
 * Convierte errores de axios en ApiError con información contextual
 *
 * @param {unknown} error - Error capturado (puede ser AxiosError u otro tipo)
 * @param {string} context - Contexto del error para personalizar el mensaje
 * @returns {ApiError} Error procesado con información contextual
 *
 * @example
 * try {
 *   const response = await axios.get('/api/data');
 *   return response.data;
 * } catch (error) {
 *   throw handleApiError(error, 'datos del usuario');
 * }
 *
 * // Resultado: ApiError con mensaje "Error al obtener datos del usuario: 404"
 */
export const handleApiError = (error: unknown, context: string): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return new ApiError(
      `Error al obtener ${context}: ${
        axiosError.response?.status || "Sin respuesta"
      }`,
      axiosError.response?.status
    );
  }

  // Error de red o parsing
  return new ApiError("Error de conexión. Por favor, intenta nuevamente.");
};
