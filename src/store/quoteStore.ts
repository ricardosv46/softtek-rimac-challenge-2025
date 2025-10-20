import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/services/types/user";
import type { Plan } from "@/services/types/plan";

/**
 * Estados posibles para la selección de usuario en el proceso de cotización
 * Define si el usuario está cotizando para sí mismo o para otra persona
 */
export const UserSelectionState = {
  EMPTY: "empty",
  FOR_ME: "for_me",
  FOR_SOMEONE_ELSE: "for_someone_else",
} as const;

export type UserSelectionState =
  (typeof UserSelectionState)[keyof typeof UserSelectionState];

/**
 * Datos del formulario de cotización
 * Contiene la información ingresada por el usuario
 */
interface FormData {
  documentType: string;
  documentNumber: string;
  phone: string;
  privacyPolicy: boolean;
  commercialCommunications: boolean;
}

/**
 * Estado global del proceso de cotización
 * Maneja todos los datos necesarios para el flujo de cotización
 */
interface QuoteState {
  userFormData: FormData | null;
  userSelectionState: UserSelectionState;
  selectedPlan: Plan | null;
  userApiData: User | null;

  setUserFormData: (data: FormData) => void;
  setUserSelectionState: (state: UserSelectionState) => void;
  setSelectedPlan: (plan: Plan) => void;
  setUserApiData: (user: User) => void;
  clearQuote: () => void;
}

/**
 * Store global de Zustand para el proceso de cotización
 * Incluye persistencia en localStorage para mantener el estado entre sesiones
 *
 * @example
 * const { userFormData, setUserFormData, clearQuote } = useQuoteStore();
 *
 * // Guardar datos del formulario
 * setUserFormData(formData);
 *
 * // Limpiar todo el estado
 * clearQuote();
 */
export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      userFormData: null,
      userSelectionState: UserSelectionState.EMPTY,
      selectedPlan: null,
      userApiData: null,

      setUserFormData: (data) => set({ userFormData: data }),
      setUserSelectionState: (state) => set({ userSelectionState: state }),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setUserApiData: (user) => set({ userApiData: user }),
      clearQuote: () =>
        set({
          userFormData: null,
          userSelectionState: UserSelectionState.EMPTY,
          selectedPlan: null,
          userApiData: null,
        }),
    }),
    {
      name: "quote-storage", // nombre en localStorage
      // Solo persistir datos importantes que queremos mantener
      partialize: (state) => ({
        userFormData: state.userFormData,
        userApiData: state.userApiData,
        userSelectionState: state.userSelectionState,
        selectedPlan: state.selectedPlan,
      }),
    }
  )
);
