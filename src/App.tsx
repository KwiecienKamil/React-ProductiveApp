import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://395e-87-205-130-245.ngrok-free.app/users", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((res) => {
        const responseForClient = res.data[0].username;
        setData(responseForClient);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <div>{data}</div>;
}

export default App;
