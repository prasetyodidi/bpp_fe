'use client'
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Test() {
  const [isOpenUcapan, setIsOpenUcapan] = useState(true);
  return (
    <main className="flex flex-row gap-8 p-12">
      <div className="p-8 bg-green-400">box 1</div>
      <div className="flex flex-row relative bg-red-400 p-8">
        box2
        <div>child 1</div>
        <div className="absolute top-0">child 2</div>
      </div>
      <Modal onClose={() => setIsOpenUcapan(false)} trigger={isOpenUcapan}>
        <div className={"font-bold text-slate-950"}>Berikut Contoh Ucapan Pembuka</div>
        <div className={"text-justify text-slate-950"}>
          &quot;Dengan segala kerendahan hati, kami sangat berbahagia bisa
          membagi saat-saat penting ini kepada Bapak/Ibu/Saudara/i. Besar
          harapan kami atas kehadiran serta iringan doa dan restunya agar
          pernikahan yang akan digelar bisa berjalan sebagaimana mestinya.&quot;
        </div>
      </Modal>
    </main>
  );
}
