import { useQuery } from "@tanstack/react-query";
import { userApi } from "../services";

/**
 * Hook personalizado para obtener datos del usuario
 * Utiliza React Query para manejo de cache y estados de carga
 *
 * @returns {Object} Objeto con data, isLoading, error y refetch
 * @returns {UserApiResponse|null} data - Datos del usuario obtenidos de la API
 * @returns {boolean} isLoading - Estado de carga de la petición
 * @returns {Error|null} error - Error si la petición falla
 * @returns {Function} refetch - Función para re-ejecutar la petición manualmente
 *
 * @example
 * const { data, isLoading, error, refetch } = useUser();
 *
 * // Ejecutar petición manualmente
 * const handleGetUser = async () => {
 *   const result = await refetch();
 *   if (result.data) {
 *     console.log('Usuario obtenido:', result.data);
 *   }
 * };
 */
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getUser(),
    enabled: false, // Solo se ejecuta cuando se llama manualmente
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
