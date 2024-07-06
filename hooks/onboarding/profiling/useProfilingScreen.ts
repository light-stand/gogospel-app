import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { profilingFlow, fieldsByScreen, UserType } from "@/constants/profiling";

type ProfilingFlowTypes = keyof typeof profilingFlow;

export const getNextStep = (
  current: string,
  flowType: ProfilingFlowTypes
): string => {
  const steps = profilingFlow[flowType];
  return steps[steps.indexOf(current) + 1];
};

export const useProfilingScreen = (field: string) => {
  const router = useRouter();
  const form = useFormContext();
  const { getFieldState, formState, trigger, clearErrors } = form;

  const onNext = async () => {
    const flowType = form.getValues("type");
    const isValid = await trigger(fieldsByScreen[flowType as UserType][field]);
    if (!isValid) {
      const updatedField = getFieldState(field);
      console.log(updatedField.error);
      return;
    }

    const nextStep = getNextStep(field, flowType);
    router.push(`/onboarding/profiling/${nextStep}`);
  };

  return { form, onNext };
};
