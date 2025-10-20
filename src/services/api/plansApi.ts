import axios from "axios";
import type { PlansApiResponse } from "../types/plan";
import { API_BASE_URL } from "@/lib/envs";
import { delay, handleApiError } from "@/utils";

/**
 * Servicio para obtener planes de seguros desde la API
 * Incluye simulación de delay para mejor UX
 */
export const plansApi = {
  /**
   * Obtiene la lista de planes de seguros desde la API externa
   *
   * @returns {Promise<PlansApiResponse>} Promesa que resuelve con la lista de planes
   * @throws {ApiError} Error si la petición falla
   *
   * @example
   * try {
   *   const plansData = await plansApi.getPlans();
   *   console.log('Planes disponibles:', plansData.list.length);
   * } catch (error) {
   *   console.error('Error al obtener planes:', error.message);
   * }
   */
  async getPlans(): Promise<PlansApiResponse> {
    try {
      const response = await axios.get<PlansApiResponse>(
        `${API_BASE_URL}/plans.json`
      );
      await delay(1);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "planes");
    }
  },
};
