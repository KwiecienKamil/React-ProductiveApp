import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleGetDoneDates = () => {
    axios.get("http://192.168.100.8:3000/api/getDoneDates").then((res) => {
      localStorage.setItem("doneDates", JSON.stringify(res.data));
    });
  };

  const currentUser = localStorage.getItem("user");
  const currentUserValue = currentUser ? JSON.parse(currentUser) : [];
  const currentUserId = currentUserValue.id;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.clear();

    try {
      const response = await axios.post(
        "https://5789-87-205-130-245.ngrok-free.app/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        alert("Wrong Email/password");
      } else {
        const savedUsername = JSON.stringify(username);
        localStorage.setItem("username", username);
        console.log("Logged in successfully:", username, password);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("There was an error with the login request:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-[450px] pt-2 rounded-xl"
      method="post"
    >
      <label
        htmlFor="username"
        className="input input-bordered flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          id="username"
        />
      </label>
      <label
        htmlFor="password"
        className="input input-bordered flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          id="password"
        />
      </label>
      <div className=" flex items-center justify-end gap-2">
        <p className="text-[#787878]">Dont't have account?</p>
        <a
          href="/register"
          className="hover:text-black text-black font-semibold"
        >
          Register
        </a>
      </div>
      <button
        className="btn bg-sec text-white hover:bg-[#23262b] mt-4"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
