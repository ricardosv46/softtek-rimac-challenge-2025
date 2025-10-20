/**
 * Función que retorna una promesa que se resuelve después de un tiempo específico
 * Útil para simular delays en desarrollo o testing
 *
 * @param {number} seconds - Tiempo de espera en segundos
 * @returns {Promise<void>} Promise que se resuelve después del tiempo especificado
 *
 * @example
 * // Esperar 2 segundos
 * await delay(2);
 * console.log('Han pasado 2 segundos');
 *
 * // Usar en async/await
 * const fetchData = async () => {
 *   await delay(1);
 *   return await api.getData();
 * };
 *
 * // Usar con .then()
 * delay(3).then(() => {
 *   console.log('Han pasado 3 segundos');
 * });
 */
export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};
