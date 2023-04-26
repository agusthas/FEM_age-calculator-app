import "./App.css";
import Inputs from "./components/Inputs/Inputs";
import Results from "./components/Results/Results";

function App() {
  return (
    <div className="App">
      <div className="card">
        <Inputs />
        <Results />
      </div>
    </div>
  );
}

export default App;
