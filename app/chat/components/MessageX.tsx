export default function MessageX({
  username = "ucup",
  text = "example message",
  avatarUrl = "/people1.png",
}) {
  return (
    <main className="flex flex-row items-start gap-2">
      <img
        src={avatarUrl}
        alt="people1"
        className="rounded-xl h-12 object-cover"
      />
      <div className="flex flex-col bg-slate-100 p-2 rounded-md text-slate-950">
        <div className="font-semibold">{username}</div>
        <div className="text-slate-950">{text}</div>
        <div className="text-sm text-slate-700 text-right">11:35</div>
      </div>
    </main>
  );
}
