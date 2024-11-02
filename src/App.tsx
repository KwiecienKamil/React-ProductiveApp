import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  axios.get("http://192.168.100.8:8081/users").then((res) => {
    const dataForClient = res.data[0].username;
    setData(dataForClient);
  });

  return <div className="">{data}</div>;
}

export default App;
