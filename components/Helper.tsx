import Cookies from "js-cookie";

export function GetToken() {
  return Cookies.get("token");
}

export async function FetchAPI(
  endpoint: string,
  method: string,
  body: object = {}
) {
  const token = "Token " + Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  let info = {};

  if (method == "GET") {
    info = {
      method: method,
      headers: headers,
    };
  } else {
    info = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, info)
    .then((response) => {
      if (response.ok) {
        const result = response.json();
        console.log("data", result);
        return result;
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      // Process the returned data
      //   console.log("Response:", data);
      return data;
    });
}

export function GetGroupId() {
  return Cookies.get("groupId");
}

export function GetTopic(): string {
  return Cookies.get("topic") ?? "";
}

export function GetAuthUsername() {
  return Cookies.get("username");
}

export function SetCookie(key: string, value: any) {
  Cookies.set(key, value);
}

export function UnsetToken() {
  Cookies.remove("token");
}

export function SetGroup(group: Group) {
  const jsonGroup = JSON.stringify(group);
  Cookies.set("group", jsonGroup);
}

export function GetGroup(): Group | null {
  const group = Cookies.get("group") ?? null;
  if (group != null) {
    const result: Group = JSON.parse(group);
    return result;  
  }
  return null
}
