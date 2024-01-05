export default function LoginForm() {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex flex-col gap-2">
        <span>Email address</span>
        <input
          type="text"
          placeholder="Your email"
          className="border-slate-200 border-2 focus:ring-0 ring-0 py-4 px-2 rounded-md"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          className="border-slate-200 border-2 focus:ring-0 ring-0 py-4 px-2 rounded-md"
        />
      </div>
      <button className="border-slate-900 border-2 bg-slate-900 focus:ring-0 ring-0 py-4 px-2 rounded-md text-white">
        Sign in
      </button>
    </div>
  );
}
