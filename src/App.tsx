import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const login = () => {
    console.log("Attempting to log in with:", emailLog, passwordLog);

    axios
      .post(
        "https://5789-87-205-130-245.ngrok-free.app/login",
        {
          username: emailLog,
          password: passwordLog,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.message) {
          alert("Wrong Email/password");
        } else {
          const savedEmail = JSON.stringify(emailLog);
          localStorage.setItem("email", savedEmail);
          setEmailLog("");
          setPasswordLog("");
          console.log("Logged in successfully:", emailLog, passwordLog);
        }
      })
      .catch((error) => {
        console.error("There was an error with the login request:", error);
      });
  };

  useEffect(() => {
    axios
      .get("https://5789-87-205-130-245.ngrok-free.app/users", {
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

  return (
    <div>
      <div>{data}</div>
      <div className="flex justify-center flex-col mt-4">
        <label className="mt-2 text-center">Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailLog(e.target.value);
          }}
          value={emailLog}
          className="w-full mb-4 mt-1 pt-1 pb-1 rounded-full text-black text-center border-2 border-black"
        />
        <label htmlFor="password" className="text-center">
          Password
        </label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
          value={passwordLog}
          className="mt-1 pt-1 pb-1 w-full rounded-full text-black text-center border-2 border-black"
        />
        <button
          onClick={login}
          className="mt-6 p-3 text-lg bg-black text-white rounded-full hover:bg-lightBlack duration-300 ease-in-out cursor-pointer"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default App;
