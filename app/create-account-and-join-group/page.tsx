"use client";
import { FetchAPI } from "@/components/Helper";
import Modal from "@/components/Modal";
import { useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";

export default () => {
  const inputStyle = "bg-transparent focus:outline-none focus:underline";
  const [username, setUsername] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [password, setPassword] = useState("");

  async function ActionHandler() {
    const apiUrl = "/chat/create-user-and-join-group";
    const requestData = {
      username: username,
      groupCode: groupCode,
    };

    FetchAPI(apiUrl, "POST", requestData).then((data) => {
      const account = data.account;
      setIsOpenModal(true);
      setPassword(account.password);
      console.log("Response:", data);
    });
  }
  return (
    <main className="min-h-screen w-full bg-slate-800 text-slate-950">
      <div className="max-w-md h-screen mx-auto bg-slate-50 flex flex-col p-8">
        <div className="flex flex-row gap-2 items-center">
          <a href="/">
            <HiArrowSmallLeft className="text-xl" />
          </a>
          <h1 className="text-lg">Buat Akun and Join Grup</h1>
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
          <h2>Masukan Nama Kode Group</h2>
          <input
            type="text"
            placeholder="qsdwrtf"
            className={inputStyle}
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <button
            onClick={ActionHandler}
            className="bg-slate-300 px-4 py-1 rounded-md"
          >
            Kirim
          </button>
        </div>
      </div>

      <Modal onClose={() => setIsOpenModal(false)} trigger={isOpenModal}>
        <div className={"font-bold text-slate-950"}>
          Berhasil Membuat group dan Berikut akun temporary anda
        </div>
        <div className={"text-justify text-slate-950"}>
          username: {username}
        </div>
        <div className={"text-justify text-slate-950"}>
          password: {password}
        </div>
        <a href="/login">Login</a>
      </Modal>
    </main>
  );
};
