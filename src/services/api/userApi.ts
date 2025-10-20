import axios from "axios";
import type { UserApiResponse } from "../types/user";
import { delay, handleApiError } from "@/utils";
import { API_BASE_URL } from "@/lib/envs";

/**
 * Servicio para obtener datos del usuario desde la API
 * Incluye simulación de delay para mejor UX
 */
export const userApi = {
  /**
   * Obtiene los datos del usuario desde la API externa
   *
   * @returns {Promise<UserApiResponse>} Promesa que resuelve con los datos del usuario
   * @throws {ApiError} Error si la petición falla
   *
   * @example
   * try {
   *   const userData = await userApi.getUser();
   *   console.log('Usuario:', userData.name);
   * } catch (error) {
   *   console.error('Error al obtener usuario:', error.message);
   * }
   */
  async getUser(): Promise<UserApiResponse> {
    try {
      const response = await axios.get<UserApiResponse>(
        `${API_BASE_URL}/user.json`
      );
      await delay(1);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "datos del usuario");
    }
  },
};
