import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { profilingFlow } from "@/constants/profiling";

type ProfilingFlowTypes = keyof typeof profilingFlow;

export const getNextStep = (
  current: string,
  flowType: ProfilingFlowTypes
): string => {
  const steps = profilingFlow[flowType];
  return steps[steps.indexOf(current) + 1];
};

export const useProfiling = (currentField: string) => {
  const router = useRouter();
  const form = useFormContext();

  const onNext = () => {
    const nextStep = getNextStep(currentField, form.getValues("type"));
    router.push(`/onboarding/profiling/${nextStep}`);
  };

  return { form, onNext };
};
