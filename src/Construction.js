import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

function Construction() {
  const location = useLocation();

  const queryParams = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return { construction: query.get("id") };
  }, [location]);

  const socket = useMemo(() => io("http://localhost:4000/room"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
      socket.emit("join", {
        construction: queryParams.construction,
      });
    });

    socket.on("danger", (data) => {
      console.log(data);
    });
  }, [socket, queryParams]);
  return (
    <div>
      <h1>Join Test</h1>
    </div>
  );
}

export default Construction;
