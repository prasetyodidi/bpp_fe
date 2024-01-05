"use client";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function Auth() {
  const [page, setPage] = useState("login");
  return (
    <div className="min-h-screen w-full bg-slate-800">
      <div className="max-w-md h-screen mx-auto bg-white flex flex-col gap-12 p-8">
        <h1 className="mt-40 text-center text-2xl text-slate-950">Chating!</h1>
        <div className="flex flex-row justify-between bg-slate-200 rounded-md px-2 py-1">
          <div
            className={`${
              page == "login" ? "bg-white" : ""
            } w-1/2 flex flex-row justify-center rounded-md py-1 text-slate-950`}
            onClick={() => setPage("login")}
          >
            Sign in
          </div>
          <div 
            className={`${
              page == "register" ? "bg-white" : ""
            } w-1/2 flex flex-row justify-center rounded-md py-1 text-slate-950`}
            onClick={() => setPage("register")}
            >
            Sign up
          </div>
        </div>
        <div>{page == "login" ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
}
