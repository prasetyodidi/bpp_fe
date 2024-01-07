export default function Profil() {
  return (
    <div className="min-h-screen w-screen bg-slate-800">
      <div className="relative max-w-md h-screen mx-auto bg-slate-50 flex flex-col gap-12">
        <header className="absolute top-0 left-0 right-0 z-10 h-14 bg-slate-900 flex flex-row justify-between items-center px-2">
          <div className="flex flex-row gap-4">
            <h1 className="text-white">title</h1>
            <span>kode</span>
          </div>
        </header>
        <main className="h-full flex flex-col gap-4 px-2 overflow-auto py-16">
          <div className="flex flex-row justify-between">
            <img
              src="https://ui-avatars.com/api/?name=ucup+surucup"
              className="rounded-full w-20 h-auto"
            />
            <div className="flex flex-col">
                <span>1</span>
                <span>2</span>
            </div>
          </div>
        </main>
        <footer className="absolute z-10 bottom-0 h-12 px-2 flex flex-row w-full bg-white justify-center items-center border-2 border-slate-200">
          footer
        </footer>
      </div>
    </div>
  );
}
