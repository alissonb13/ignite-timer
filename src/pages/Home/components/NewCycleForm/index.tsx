import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        {...register("task")}
        disabled={!!activeCycle}
        placeholder="Dê um nome para a sua tarefa"
        list="task-suggestions"
        id="task"
      />

      <datalist id="task-suggestions"></datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle}
        id="minutesAmount"
        placeholder="00"
        type="number"
        step={5}
        max={60}
        min={1}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
