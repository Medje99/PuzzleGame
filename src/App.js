import Header from './components/Header';
import Puzzle from './components/Puzzle';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Header/>
      <Puzzle/>
    </GameProvider>
  );
}

export default App;

