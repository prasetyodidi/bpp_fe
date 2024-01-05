"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { FetchAPI, SetCookie } from "@/components/Helper";

export default () => {
  const inputStyle = "bg-transparent focus:outline-none focus:underline";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  async function ActionHandler() {
    const apiUrl = "http://127.0.0.1:8000/login";
    const requestData = {
      username: username,
      password: password,
    };

    FetchAPI(apiUrl, "POST", requestData).then((data) => {
      const token = data.token;
      const username = data.user.username;

      console.log("Response:", token);

      SetCookie("token", token);
      SetCookie("username", username);

      push("/group");
    });
  }

  return (
    <main className="min-h-screen w-full bg-slate-800 text-slate-950">
      <div className="max-w-md h-screen mx-auto bg-slate-50 flex flex-col p-8">
        <div className="flex flex-row gap-2 items-center">
          <a href="/">
            <HiArrowSmallLeft className="text-xl" />
          </a>
          <h1 className="text-lg">Login</h1>
        </div>
        <div className="border-2 rounded-lg flex flex-col items-center p-2 gap-2">
          <h2>Masukan Username</h2>
          <input
            type="text"
            placeholder="ucup"
            className={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h2>Masukan Password</h2>
          <input
            type="password"
            placeholder="rahasia"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={ActionHandler}
            className="bg-slate-300 px-4 py-1 rounded-md"
          >
            Kirim
          </button>
        </div>
      </div>
    </main>
  );
};
