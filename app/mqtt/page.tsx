"use client";
import mqtt from "mqtt";
import MessageX from "../chat/components/MessageX";
import { useEffect, useState } from "react";
import MessageY from "../chat/components/MessageY";

export default function MqttChat() {
  interface Message {
    username: string;
    text: string;
    avatar: string;
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      username: "Ucup",
      text: "Good Afternoon",
      avatar: "https://ui-avatars.com/api/?name=Ucup+Surucup",
    },
  ]);

  const url = "ws://broker.emqx.io:8083/mqtt";
  const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: "emqx_test" + Math.random().toString(16).substring(2, 8),
    username: "emqx",
    password: "public",
  };

  const client = mqtt.connect(url, options);
  client.on("connect", function () {
    console.log("Connected");
    // Subscribe to a topic
    client.subscribe("bpp-1", function (err) {
      console.log(err);
      if (!err) {
        console.log("not error");

        // Publish a message to a topic
        //   client.publish("bpp-1", JSON.stringify({
        //     "msg": "haiiiii",
        //     "username": "ucup"
        //   }));
      }
    });
  });

  useEffect(() => {
    client.on("message", function (topic, payload) {
      // message is Buffer
      let response = JSON.parse(payload.toString());
  
      console.log(`Topic: ${topic}, Message: ${response.msg}`);
  
      const newMessage = {
        username: response.username,
        text: response.msg,
        avatar: "https://ui-avatars.com/api/?name=" + response.username,
      }
      setMessages([...messages, newMessage]);
    });
  }, [messages])

  const currentUsername = "diii"

  return (
    <main>
      <h1>mqtt chat</h1>
      <ul>
        {messages.map((item, key) => {
          if (item.username == currentUsername) {
            return (
              <MessageY
                key={key}
                text={item.text}
                username={item.username}
                avatarUrl={item.avatar}
              />
            )
          }
          return (
            <MessageX
              key={key}
              text={item.text}
              username={item.username}
              avatarUrl={item.avatar}
            />
          )
        } )}
      </ul>
    </main>
  );
}
