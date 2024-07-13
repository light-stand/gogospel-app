import { useRouter } from "expo-router";
import { UseFormReturn } from "react-hook-form";
import {
  fieldsByScreen,
  ProfilingField,
  profilingFlow,
  ProfilingScreen,
  UserType,
} from "../domain/Profiling";
import { useProfilingContext } from "../context/ProfilingContext";
import { ProfilingFields } from "../domain/ProfilingForm";

export const getNextScreen = (current: ProfilingScreen, flowType: UserType) => {
  const steps = profilingFlow[flowType];
  const nextIndex = steps.indexOf(current) + 1;
  const isLast = nextIndex > steps.length - 1;
  const nextScreen = !isLast ? `/onboarding/profiling/${steps[nextIndex]}` : "";
  return { nextScreen, isLast };
};

export const useProfilingScreen = (screen: ProfilingScreen) => {
  const router = useRouter();
  const { form, onSubmit } = useProfilingContext();
  const { trigger, getValues } = form as UseFormReturn<ProfilingFields>;

  const onNext = async () => {
    const flowType = getValues("type") as UserType;
    const isValid = await trigger(fieldsByScreen[flowType][screen]);
    if (!isValid) return;
    const { nextScreen, isLast } = getNextScreen(screen, flowType);
    isLast ? onSubmit() : router.push(nextScreen);
  };

  return { form, onNext };
};
