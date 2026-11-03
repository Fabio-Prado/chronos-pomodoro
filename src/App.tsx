import { Heading } from './components/Heading.tsx';
import { CountDown } from './components/CountDown';

export default function App() {
  return (
    <div>
      <Heading>Chronos Pomodoro</Heading>
      <CountDown />
    </div>
  );
}