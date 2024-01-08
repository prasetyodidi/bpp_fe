"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchAPI, SetCookie, SetGroup } from "@/components/Helper";

export default function Group() {
  interface GroupDTO {
    id: number;
    name: string;
    code: string;
    created_at: number;
    owner: number;
    active_period: number;
    members: [];
  }
  const { push } = useRouter();
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  async function getGroups() {
    const endpoint = "/chat/groups";

    const list_group = await FetchAPI(endpoint, "GET");

    setGroups(list_group);
  }

  function redirectToChat(group: Group) {
    const groupId = group.id;
    const groupCode = group.code;

    SetCookie("groupId", groupId);
    SetCookie("topic", "group/" + groupCode);
    SetGroup(group);
    push("/chat");
  }

  const [isHitAAPI, setIsHitAPI] = useState(false);

  useEffect(() => {
    setIsHitAPI(true);
  }, []);

  useEffect(() => {
    if (!isHitAAPI) {
      getGroups();
    }
  }, []);

  return (
    <div className="min-h-screen w-screen bg-slate-800">
      <div className="relative w-full md:max-w-md h-screen mx-auto bg-slate-50 flex flex-col gap-12">
        <header className="absolute top-0 left-0 right-0 z-10 h-14 bg-slate-100 text-black flex flex-row justify-between items-center px-6">
          <div className="flex flex-row gap-4">
            <h1 className="text-lg font-semibold">Groups</h1>
          </div>
        </header>
        <main className="h-full flex flex-col gap-4 px-2 overflow-auto py-16">
          <ul className="text-black flex flex-col gap-2">
            {groups.map((item, key) => (
              <div
                className="bg-slate-100 flex flex-row items-center p-2 gap-4"
                key={key}
                onClick={() =>
                  redirectToChat({
                    id: item.id,
                    name: item.name,
                    code: item.code,
                    activePeriod: item.active_period,
                  })
                }
              >
                <img
                  src={"https://ui-avatars.com/api/?name=" + item.name}
                  alt={"avatar " + item.name}
                  className="rounded-full h-12 object-cover"
                />
                <span className="hover:cursor-pointer hover:underline">{item.name}</span>
              </div>
            ))}
          </ul>
        </main>
        <footer className="absolute z-10 bottom-0 h-12 px-2 flex flex-row w-full bg-white justify-center items-center border-2 border-slate-200">
          footer
        </footer>
      </div>
    </div>
  );
}
