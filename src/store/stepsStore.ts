import { create } from "zustand";

interface StepsState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetSteps: () => void;
}

export const useStepsStore = create<StepsState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  resetSteps: () => set({ currentStep: 1 }),
}));

