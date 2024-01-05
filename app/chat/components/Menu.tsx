"use client";
import { UnsetToken } from "@/components/Helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

export default function Menu({ onOpenTimePeriod }: { onOpenTimePeriod: any }) {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleOnLogout() {
    UnsetToken()
    push('/')
  }

  return (
    <div>
      {isOpen ? (
        <div className="flex flex-col bg-slate-900 absolute top-4 right-4 rounded-md text-white p-4 gap-2 text-sm">
          <span
            onClick={() => setIsOpen(false)}
            className="hover:cursor-pointer"
          >
            close
          </span> 
          <span
            onClick={onOpenTimePeriod}
            className="hover:cursor-pointer"
          >
            Kapan Hapus
          </span>
          <span>Pengaturan</span>
          <span onClick={handleOnLogout} className="hover:cursor-pointer">Logout</span>
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)} className="hover:cursor-pointer">
          <HiOutlineEllipsisVertical />
        </div>
      )}
    </div>
  );
}
