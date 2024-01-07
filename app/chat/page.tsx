"use client";
import mqtt, { IClientOptions } from "mqtt";
import Menu from "./components/Menu";
import MessageX from "./components/MessageX";
import MessageY from "./components/MessageY";
import { HiPaperAirplane } from "react-icons/hi2";
import { useEffect, useState } from "react";
import {
  FetchAPI,
  GetAuthUsername,
  GetGroup,
  GetGroupId,
  GetTopic,
} from "@/components/Helper";
import Modal from "@/components/Modal";

export default function Chat() {
  interface Message {
    key: number;
    username: string;
    text: string;
    avatar: string;
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      key: 1,
      username: "Ucup",
      text: "Good Afternoon",
      avatar: "https://ui-avatars.com/api/?name=Ucup+Surucup",
    },
  ]);
  const [text, setText] = useState("");
  const [isHitAPI, setIsHitAPI] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lastMessageKey, setLastMessageKey] = useState(0);
  const currentUsername = GetAuthUsername();
  const currentGroupId = GetGroupId();
  const topic = GetTopic();
  const [isOpenTimePeriod, setIsOpenTimePeriod] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const group = GetGroup();

  function changeCurrentPeriod(value: number) {
    console.log("time period change");
    setSelectedPeriod(value);
  }

  const url = "wss://broker.emqx.io:8084/mqtt";
  // const url = "mqtts://broker.emqx.io:8883";
  
  const options: IClientOptions = {
    clientId: "emqx_test" + Math.random().toString(16).substring(2, 8),
    username: "emqx",
    password: "public",
    keepalive: 60,
    // protocol: 'mqtts',
    // protocolId: "MQTT",
    // protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  const client = mqtt.connect(url, options);
  client.on("connect", function () {
    console.log("Connected");
    // Subscribe to a topic
    client.subscribe(topic, function (err) {
      console.log("error " + topic);
      if (!err) {
        // Publish a message to a topic
        //   client.publish(topic, JSON.stringify({
        //     "msg": "haiiiii",
        //     "username": "ucup"
        //   }));
      }
    });
  });

  client.on("message", function (topic, payload) {
    // message is Buffer
    let response = JSON.parse(payload.toString());

    console.log(`Topic: ${topic}, Message: ${response.msg}`);

    if (lastMessageKey != response.key) {
      setLastMessageKey(response.key);
      const newMessage = {
        key: response.key,
        username: response.username,
        text: response.msg,
        avatar: "https://ui-avatars.com/api/?name=" + response.username,
      };
      setMessages([...messages, newMessage]);
    }
  });

  async function pushMessage() {
    const endpoint = "/chat/messages";
    const data = {
      groupId: currentGroupId,
      text: text,
    };

    FetchAPI(endpoint, "POST", data).then((data) =>
      console.log("Response:", data)
    );

    console.log("push message");
  }

  async function loadMessages() {
    const endpoint = "/chat/groups/" + GetGroupId();
    FetchAPI(endpoint, "GET").then((data) => {
      console.log(data);

      const x = data.map((item: any) => {
        return {
          text: item.message,
          username: item.owner.username,
          avatar: "https://ui-avatars.com/api/?name=" + item.owner.username,
        };
      });
      setMessages(x);
    });
  }

  useEffect(() => {
    setIsHitAPI(true);
  }, []);

  useEffect(() => {
    if (!isHitAPI) {
      console.log("i believe this call once");

      loadMessages();
    }
  }, []);

  function handleTimePeriod() {
    const endpoint = "/chat/groups/" + group?.id + "/change-time-period";
    const body = {
      activePeriodId: selectedPeriod,
    };
    FetchAPI(endpoint, "PUT", body).then((data) => console.log(data));
  }

  return (
    <div className="min-h-screen w-screen bg-slate-800">
      <div className="relative max-w-md h-screen mx-auto bg-slate-50 flex flex-col gap-12">
        <header className="absolute top-0 left-0 right-0 z-10 h-14 bg-slate-900 flex flex-row justify-between items-center px-2">
          <div className="flex flex-row gap-4">
            <h1 className="text-white">{group?.name}</h1>
            <span>{group?.code}</span>
          </div>
          <Menu onOpenTimePeriod={() => setIsOpenTimePeriod(true)} />
        </header>
        <main className="h-full flex flex-col gap-4 px-2 overflow-auto py-16">
          {messages.map((item, key) => {
            if (item.username == currentUsername) {
              return (
                <MessageY
                  key={key}
                  text={item.text}
                  username={item.username}
                  avatarUrl={item.avatar}
                />
              );
            }
            return (
              <MessageX
                key={key}
                text={item.text}
                username={item.username}
                avatarUrl={item.avatar}
              />
            );
          })}
        </main>
        <footer className="absolute z-10 bottom-0 h-12 px-2 flex flex-row w-full bg-white justify-center items-center border-2 border-slate-200">
          <input
            type="text"
            placeholder="Start typing...."
            className="w-full h-full ring-0 border-0 focus:ring-0 focus:border-0 focus:outline-none text-slate-900"
            onChange={(e) => setText(e.target.value)}
          />
          <HiPaperAirplane
            className="text-black text-2xl hover:cursor-pointer"
            onClick={pushMessage}
          />
        </footer>
      </div>
      <Modal onClose={() => setIsOpenModal(false)} trigger={isOpenModal}>
        <div className={"font-bold text-slate-950"}>
          Berikut akun temporary anda
        </div>
        <div className={"text-justify text-slate-950"}>username:</div>
        <div className={"text-justify text-slate-950"}>password:</div>
        <a href="/login">Login</a>
      </Modal>
      <Modal
        onClose={() => setIsOpenTimePeriod(false)}
        trigger={isOpenTimePeriod}
      >
        <div className="flex flex-col">
          <label className="text-black">
            <input
              type="radio"
              value="1week"
              checked={selectedPeriod === 1}
              onChange={() => changeCurrentPeriod(1)}
            />
            1 Week
          </label>

          <label className="text-black">
            <input
              type="radio"
              value="1month"
              checked={selectedPeriod === 2}
              onChange={() => changeCurrentPeriod(2)}
            />
            1 Month
          </label>

          <label className="text-black">
            <input
              type="radio"
              value="6months"
              checked={selectedPeriod === 3}
              onChange={() => changeCurrentPeriod(3)}
            />
            6 Months
          </label>
        </div>
        <button onClick={handleTimePeriod} className="text-black">
          Perbarui
        </button>
      </Modal>
    </div>
  );
}
