export default () => (
  <main className="min-h-screen w-full bg-slate-800 text-slate-950">
    <div className="w-full md:max-w-md h-screen mx-auto bg-slate-50 flex flex-col gap-4 p-8">
      <div className="border-2 rounded-lg flex flex-col p-2 gap-2">
        <h1 className="font-medium text-xl text-center">Register</h1>
        <a
          href="/create-account-and-create-group"
          className="bg-slate-300 rounded-md py-1 hover:underline text-center"
        >
          Buat akun dan <span className="font-bold">buat</span> group
        </a>
        <span className="text-center">or</span>
        <a href="/create-account-and-join-group" className="bg-slate-300 rounded-md py-1 hover:underline text-center">
          Buat akun dan <span className="font-bold">join</span> group
        </a>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <span>Sudah punya akun?</span>
        <a href="/login" className="bg-slate-300 py-1 px-4 rounded-md hover:underline">
          Login
        </a>
      </div>
    </div>
  </main>
);
