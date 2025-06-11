import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useStore from "./store/store";
import Socket from "./socket";
import { useEffect } from "react";
import { ChatComponent } from "./n8n";

function App() {
  const bears = useStore((state) => state.bears);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/health");
      console.log(res);
    })();
  }, []);
  console.log(bears);
  return (
    <>
      <div>
        <Socket />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => useStore.getState().increasePopulation()}>
          count is {bears}
        </button>
        <button onClick={() => useStore.getState().getBears()}>
          count is {bears}
        </button>
        <p>Get bears : {bears}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ChatComponent />
    </>
  );
}

export default App;
