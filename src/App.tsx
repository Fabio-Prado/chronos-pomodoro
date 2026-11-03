import { Heading } from './components/Heading.tsx';
import { CountDown } from './components/CountDown.tsx/index.ts';

export default function App() {
  return (
    <div>
      <Heading>Chronos Pomodoro</Heading>
      <CountDown />
    </div>
  );
}