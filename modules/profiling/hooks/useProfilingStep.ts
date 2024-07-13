import { useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { UseFormReturn } from "react-hook-form";
import { fieldsByScreen, profilingFlow, ProfilingScreen, UserType } from "../domain/Profiling";
import { useProfilingContext } from "../context/ProfilingContext";
import { ProfilingFields } from "../domain/ProfilingForm";

export const getNextScreen = (current: ProfilingScreen, flowType: UserType) => {
  const steps = profilingFlow[flowType];
  const nextIndex = steps.indexOf(current) + 1;
  const isLast = nextIndex > steps.length - 1;
  const nextScreen = !isLast ? `/onboarding/profiling/${steps[nextIndex]}` : "";
  return { nextScreen, isLast };
};

export const useProfilingStep = (screen: ProfilingScreen) => {
  const router = useRouter();
  const { form, onSubmit } = useProfilingContext();
  const { trigger, getValues, resetField } = form as UseFormReturn<ProfilingFields>;

  const onNext = async () => {
    const flowType = getValues("type") as UserType;
    const isValid = (await trigger("type")) && (await trigger(fieldsByScreen[flowType][screen]));
    if (!isValid) return;
    const { nextScreen, isLast } = getNextScreen(screen, flowType);
    isLast ? onSubmit() : router.push(nextScreen);
  };

  useFocusEffect(
    useCallback(() => {
      if (screen === "type") {
        // to avoid validation problems
        resetField("lastName");
        resetField("interests");
      }
    }, [screen])
  );

  return { form, onNext, flowType: (form.getValues("type") || UserType.Missionary) as UserType };
};
