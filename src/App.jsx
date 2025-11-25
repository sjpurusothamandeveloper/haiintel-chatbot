// src/App.jsx
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="min-h-screen bg-black text-slate-100">
      {/* Your placeholder HaiIntel-like page */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Intelligence. Not Just Software.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Demo HaiIntel chat companion interface — floating AI assistant aligned
          with HaiIntel’s dark, minimal aesthetic.
        </p>
      </main>

      <ChatWidget />
    </div>
  );
}

export default App;
