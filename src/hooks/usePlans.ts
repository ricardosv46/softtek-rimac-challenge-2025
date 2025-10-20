import { useQuery } from "@tanstack/react-query";
import { plansApi } from "@/services";

/**
 * Hook personalizado para obtener planes de seguros
 * Utiliza React Query para manejo de cache y estados de carga
 *
 * @returns {Object} Objeto con data, isLoading, error y refetch
 * @returns {PlansApiResponse|null} data - Lista de planes obtenidos de la API
 * @returns {boolean} isLoading - Estado de carga de la petición
 * @returns {Error|null} error - Error si la petición falla
 * @returns {Function} refetch - Función para re-ejecutar la petición manualmente
 *
 * @example
 * const { data, isLoading, error, refetch } = usePlans();
 *
 * // Ejecutar petición manualmente
 * const handleGetPlans = async () => {
 *   const result = await refetch();
 *   if (result.data) {
 *     console.log('Planes obtenidos:', result.data.list);
 *   }
 * };
 */
export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: () => plansApi.getPlans(),
    enabled: false, // Solo se ejecuta cuando se llama manualmente
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
