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

  // Faz o tempo descer 1 segundo por vez enquanto estiver rodando
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // Quando o tempo chega a zero: para, soma um ciclo e carrega o próximo tempo
  useEffect(() => {
    if (secondsLeft !== 0) return;
    const nextCycles = cycles + 1;
    setIsRunning(false);
    setCycles(nextCycles);
    setSecondsLeft(nextCycles % 2 === 0 ? FOCUS_TIME : BREAK_TIME);
  }, [secondsLeft, cycles]);

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