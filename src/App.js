import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Construction from "./Construction";
import io from "socket.io-client";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const socket = useMemo(() => io("http://13.125.73.230:4000"), []);

  useEffect(() => {
    socket.on("receive", (data) => {
      setData(data.body);
      console.log(data.body);
      console.log(data.body["m2m:cin"]);
    });
  });
  return (
    <div>
      <h1>ThingPlugSubscription Test</h1>
      {data["m2m:cin"] ? (
        <div>
          <div>
            데이터 : {data["m2m:cin"].con[0]}(하중 값이 들어갈 예정입니다)
          </div>
          <div>변환횟수 : {data["m2m:cin"].st[0]} </div>
          <div>생성날짜 : {data["m2m:cin"].ct[0]}</div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
