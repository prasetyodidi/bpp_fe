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
    SetGroup(group)
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
    <main>
      <h1>Groups</h1>
      <ul>
        {groups.map((item, key) => (
          <div
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
            {item.name}
          </div>
        ))}
      </ul>
    </main>
  );
}
