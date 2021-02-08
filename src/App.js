import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Construction from "./Construction";
import io from "socket.io-client";
import { useEffect, useMemo, useState } from "react";


function App() {
  const [data, setData] = useState({});
  const [lastData, setLastData] = useState({});
  const socket = useMemo(() => io("http://13.125.73.230:4000"), []);

  useEffect(() => {
    const getLastData = async () => {
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        "/9999991000000871/v1_0/remoteCSE-00000871d02544fffef03309/container-LoRa/latest"
      );
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("X-M2M-Origin", "00000871d02544fffef03309");
      request.setRequestHeader("X-M2M-RI", "00000871d02544fffef03309_00001");
      request.setRequestHeader("locale", "ko");
      request.setRequestHeader(
        "uKey",
        "eEVyRFREZGZEWlpCRzJFaEdIREUxVHlMeXZYeHRqdzVHZk5zWU9TdVlyVk1XWStMYVVEc1ZTNXRZamwwSWVNTw=="
      );

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log(this.response)
          setLastData(JSON.parse(this.response));
        }
      };

      request.send();
    };

    socket.on("receive", (data) => {
      setData(data.body);
      console.log(data.body);
      console.log(data.body["m2m:cin"]);
    });

    getLastData();
  }, [socket]);
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
      ) : lastData ? (
        <div>
          <div>데이터 : {lastData["cin"]?.con}(하중 값이 들어갈 예정입니다)</div>
          <div>변환횟수 : {lastData["cin"]?.st} </div>
          <div>생성날짜 : {lastData["cin"]?.ct}</div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
