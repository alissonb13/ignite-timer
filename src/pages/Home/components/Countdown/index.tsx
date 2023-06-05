import { useContext, useEffect } from "react";

import { differenceInSeconds } from "date-fns";

import { CountdownContainer, Seprator } from "./styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    setSecondsPassed,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const intervalInSeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (intervalInSeconds > totalSeconds) {
          markCurrentCycleAsFinished();
        } else {
          setSecondsPassed(intervalInSeconds);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Seprator>:</Seprator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
