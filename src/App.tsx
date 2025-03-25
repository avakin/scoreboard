import { BoardProvider } from "./components/Provider";
import { BoardList } from "./components/BoardList";
import { NewMatchForm } from "./components/NewMatchForm";

function App() {
  return (
    <BoardProvider>
      <main className="board">
        <h1>Score board</h1>
        <BoardList />
        <NewMatchForm />
      </main>
    </BoardProvider>
  );
}

export default App;
