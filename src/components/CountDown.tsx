import { useEffect, useState } from 'react';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function CountDown() {
  const [cycles, setCycles] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const isFocus = cycles % 2 === 0;
  const currentDuration = isFocus ? FOCUS_TIME : BREAK_TIME;

  useEffect(() => {
    if (!isRunning) return;

    const id = setTimeout(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
        return;
      }

      // Chegou a zero: para, soma um ciclo e carrega o próximo tempo
      const nextCycles = cycles + 1;
      setIsRunning(false);
      setCycles(nextCycles);
      setSecondsLeft(nextCycles % 2 === 0 ? FOCUS_TIME : BREAK_TIME);
    }, 1000);

    return () => clearTimeout(id);
  }, [isRunning, secondsLeft, cycles]);

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(currentDuration);
  }

  return (
    <div>
      <h2>{isFocus ? 'Foco' : 'Pausa'}</h2>
      <p style={{ fontSize: '4rem' }}>{formatTime(secondsLeft)}</p>
      <button onClick={() => setIsRunning(r => !r)}>
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={handleReset}>Resetar</button>
      <p>Ciclos concluídos: {cycles}</p>
    </div>
  );
}