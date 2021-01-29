import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Construction from "./Construction";
import io from "socket.io-client";
import { useEffect, useMemo } from "react";

function App() {
  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("receive", (data) => {
      console.log(data);
    });
  });
  return <div>
    <h1>ThingPlugSubscription Test</h1>
  </div>;
}

export default App;
