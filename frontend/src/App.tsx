import { useState } from "react";
import "./index.css";
import Home from "./Home";
import Menu from "./menu";
import Sing from "./sign";

function App() {
  const [showfunction, setShowfunction] = useState("home");

  return (
    <>
        <div className="nav">
          <h1 className="color">Tomato.</h1>

          <div className="mov">
            <button onClick={() => setShowfunction("home")}>
              <h2>home</h2>
            </button>
            <button onClick={() => setShowfunction("menu")}>
              <h2>menu</h2>
            </button>
            <button>
              <h2>mobile-app</h2>
            </button>
            <button>
              <h2>contact us</h2>
            </button>
          </div>

          <button onClick={() => setShowfunction("sign in")}>
            <h2>sign in</h2>
          </button>
        </div>
      {showfunction === "home" && <Home />}
      <div className="page">
        {showfunction === "menu" && <Menu/>}
        {showfunction === "sign in" && <Sing setShowfunction={setShowfunction} />}
      </div>
    </>
  );
}

export default App;
