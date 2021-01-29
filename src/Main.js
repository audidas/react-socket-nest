import { useState } from "react";
import { useHistory } from "react-router-dom";

function Main() {
  const [constructions, setConstructions] = useState(["test1", "test2"]);
  const history = useHistory();

  const goConstruction = (construction) => {
    history.push(`/construction?id=${construction}`);
  };
  return (
    <div>
      {constructions.map((c, key) => (
        <div key={key} onClick={() => goConstruction(c)}>
          {c}
        </div>
      ))}
    </div>
  );
}

export default Main;
