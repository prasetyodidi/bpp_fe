export default function MessageX({
  username = "ucup",
  text = "example message",
  avatarUrl = "/people1.png",
  createdAt = "11:35"
}) {
  return (
    <main className="flex flex-row items-start gap-2 w-full">
      <img
        src={avatarUrl}
        alt="people1"
        className="rounded-xl h-12 object-cover"
      />
      <div className="flex flex-col w-3/4">
        <div className="flex flex-col bg-slate-100 p-2 rounded-md text-slate-950 w-full">
          <div className="font-semibold text-slate-900">{username}</div>
          <div className="text-slate-950">{text}</div>
        </div>
        <div className="text-sm text-slate-800 text-right">{createdAt}</div>
      </div>
    </main>
  );
}
