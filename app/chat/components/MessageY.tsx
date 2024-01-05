export default function MessageY({
  username = "ucup",
  text = "example message",
  avatarUrl = "/people1.png",
}) {
  return (
    <main className="flex flex-row-reverse items-start gap-2">
      <img
        src={avatarUrl}
        alt="people1"
        className="rounded-xl h-12 object-cover"
      />
      <div className="flex flex-col bg-sky-600 p-2 rounded-md">
        <div className="font-semibold">{username}</div>
        <div className="text-white">{text}</div>
        <div className="text-sm text-slate-200">11:35</div>
      </div>
    </main>
  );
}
