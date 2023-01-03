import "./App.css";
import Home from "./Components/Home/Home";
import { Mid } from "./Components/Mid/Mid";

function App() {
  const confirtmationClick = () => {
    console.log("CONFIRMAR PRESENÇA");
  };

  return (
    <div className="App">
      <section>
        <Home onClick={confirtmationClick} />
      </section>

      <section>
        <Mid />
      </section>
    </div>
  );
}

export default App;
