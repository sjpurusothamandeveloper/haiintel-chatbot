// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MOCK_RESPONSES } from "../mockAiContent";

// // Default starter questions shown before user starts chatting
// const defaultQuestions = [
//   "What does HaiIntel do?",
//   "Explain HaiPODs model",
//   "How do you partner with CIOs?",
//   "Show sample AI use cases",
// ];

// // Helper: find matching response from static JSON
// function findBestResponse(userText) {
//   const text = userText.toLowerCase();
//   for (const resp of MOCK_RESPONSES) {
//     if (resp.triggerKeywords.some((k) => text.includes(k))) {
//       return resp;
//     }
//   }
//   return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
// }

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [streamingText, setStreamingText] = useState("");

//   const streamIntervalRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Handle send message
//   const handleSend = (overrideText) => {
//     const text = (overrideText ?? input).trim();
//     if (!text) return;

//     setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }]);
//     setInput("");
//     simulateAiResponse(text);
//   };

//   // Simulate typing + streaming AI message
//   const simulateAiResponse = (userText) => {
//     const response = findBestResponse(userText);
//     const fullText = response.aiText;

//     setIsTyping(true);
//     setStreamingText("");

//     let idx = 0;
//     clearInterval(streamIntervalRef.current);

//     streamIntervalRef.current = setInterval(() => {
//       idx++;
//       setStreamingText(fullText.slice(0, idx));

//       if (idx >= fullText.length) {
//         clearInterval(streamIntervalRef.current);

//         setIsTyping(false);
//         setStreamingText("");

//         setMessages((prev) => [
//           ...prev,
//           {
//             id: Date.now() + 1,
//             role: "ai",
//             text: fullText,
//             suggestions: response.suggestions,
//           },
//         ]);
//       }
//     }, 12);
//   };

//   // Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, streamingText]);

//   const handleSuggestionClick = (s) => handleSend(s);

//   return (
//     <>
//       {/* Floating chat button */}
//       <motion.button
//         className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-slate-200 px-4 py-3 rounded-full shadow-xl hover:bg-slate-800 transition flex items-center gap-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="text-emerald-400">●</span>
//         <span className="text-sm">Chat with HaiIntel</span>
//       </motion.button>

//       {/* Chat window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed bottom-20 right-4 sm:right-6 w-[90vw] max-w-sm sm:max-w-md h-[70vh] bg-slate-950/95 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-50"
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           >
//             {/* Header */}
//             <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center">
//               <div>
//                 <div className="text-xs uppercase tracking-wider text-slate-500">
//                   HaiIntel
//                 </div>
//                 <div className="text-sm font-semibold text-slate-100">
//                   Intelligence Companion
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-slate-400 hover:text-white text-lg"
//               >
//                 ×
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-slate-950">
//               {/* Default starter questions */}
//               {messages.length === 0 && !streamingText && (
//                 <div className="space-y-2 px-1">
//                   <div className="text-xs text-slate-400 mb-1">
//                     Try asking one of these:
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     {defaultQuestions.map((q) => (
//                       <button
//                         key={q}
//                         onClick={() => handleSend(q)}
//                         className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300 transition"
//                       >
//                         {q}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Show sent messages */}
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
//                       msg.role === "user"
//                         ? "bg-emerald-500 text-black"
//                         : "bg-slate-900 text-slate-200 border border-slate-800"
//                     }`}
//                   >
//                     {msg.text}

//                     {/* Suggestions */}
//                     {msg.role === "ai" && msg.suggestions && (
//                       <div className="mt-2 flex flex-wrap gap-2">
//                         {msg.suggestions.map((s) => (
//                           <button
//                             key={s}
//                             onClick={() => handleSuggestionClick(s)}
//                             className="text-xs px-2 py-1 rounded-full border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300 transition"
//                           >
//                             {s}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {/* Streaming AI message */}
//               {streamingText && (
//                 <div className="flex justify-start">
//                   <div className="max-w-[80%] px-3 py-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-sm">
//                     {streamingText}
//                   </div>
//                 </div>
//               )}

//               {/* Typing indicator */}
//               {isTyping && !streamingText && (
//                 <div className="flex justify-start">
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800">
//                     <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" />
//                     <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce delay-100" />
//                     <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce delay-200" />
//                     <span className="text-xs">Thinking…</span>
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="border-t border-slate-800 px-3 py-2 flex items-center gap-2 bg-slate-950">
//               <input
//                 className="flex-1 bg-slate-900 text-slate-200 text-sm px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-400"
//                 placeholder="Ask something about HaiIntel..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               />
//               <button
//                 onClick={() => handleSend()}
//                 className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition"
//               >
//                 Send
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_RESPONSES } from "../mockAiContent";

const defaultQuestions = [
    "What does HaiIntel do?",
    "Explain HaiPODs engagement model",
    "How do you partner with CIOs?",
    "Show sample AI transformation use cases"
];

function findBestResponse(userText) {
    const t = userText.toLowerCase();
    for (const resp of MOCK_RESPONSES) {
        if (resp.triggerKeywords.some(k => t.includes(k))) return resp;
    }
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [streamingText, setStreamingText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const endRef = useRef(null);
    const intervalRef = useRef();

    const send = (overrideText) => {
        const text = (overrideText ?? input).trim();
        if (!text) return;
        setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
        setInput("");
        streamAI(text);
    };

    const streamAI = (text) => {
        const res = findBestResponse(text);
        const full = res.aiText;

        let i = 0;
        setIsTyping(true);
        setStreamingText("");

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            i++;
            setStreamingText(full.slice(0, i));
            if (i >= full.length) {
                clearInterval(intervalRef.current);
                setIsTyping(false);
                setStreamingText("");
                setMessages((m) => [
                    ...m,
                    {
                        id: Date.now() + 1,
                        role: "ai",
                        text: full,
                        suggestions: res.suggestions
                    }
                ]);
            }
        }, 12);
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingText]);

    return (
        <>
            {/* Launcher Button */}
            <motion.button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50
          px-5 py-3 rounded-full
          bg-[#111315] 
          border border-[rgba(255,255,255,0.06)]
          text-white/80
          shadow-lg shadow-black/40
          hover:bg-[#1A1D20] hover:text-white
          transition-all duration-200"
            >
                HaiIntel Assistant
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 22 }}
                        className="fixed bottom-24 right-4 sm:right-6 
              w-[90vw] max-w-md h-[70vh]
              rounded-2xl overflow-hidden
              bg-[#0C0E10]/80
              backdrop-blur-2xl
              border border-[rgba(255,255,255,0.08)]
              shadow-[0_12px_40px_rgba(0,0,0,0.45)]
              flex flex-col z-50"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-black/10">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30">
                                    HaiIntel
                                </div>
                                <div className="text-sm font-medium text-white/90">
                                    Intelligence Companion
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="h-7 w-7 rounded-full 
                                bg-white/5 border border-white/10 
                                flex items-center justify-center 
                                text-white/60 hover:text-white 
                                hover:bg-white/10 transition"
                            >
                                ×
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm text-white/90">

                            {/* Default Suggestions */}
                            {messages.length === 0 && !streamingText && (
                                <div className="space-y-2">
                                    <div className="text-xs text-white/40 mb-2">
                                        Ask something to begin:
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {defaultQuestions.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => send(q)}
                                                className="px-3 py-2 rounded-lg text-xs
                          bg-white/5 
                          border border-white/10
                          text-white/70
                          hover:border-white/20 hover:text-white
                          transition-all duration-150"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* User + AI messages */}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[75%] px-3 py-2 rounded-xl 
                      ${msg.role === "user"
                                                ? "bg-white text-black shadow-md"
                                                : "bg-white/5 border border-white/10 text-white/90"
                                            }`}
                                    >
                                        {msg.text}

                                        {/* AI Suggestions */}
                                        {msg.role === "ai" && msg.suggestions && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {msg.suggestions.map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => send(s)}
                                                        className="px-2 py-1 rounded-md text-[10px]
                              bg-white/5 border border-white/10 text-white/60
                              hover:border-white/20 hover:text-white transition"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Streaming message */}
                            {streamingText && (
                                <div className="flex justify-start">
                                    <div className="max-w-[75%] px-3 py-2 rounded-xl 
                    bg-white/5 border border-white/10 text-white/90">
                                        {streamingText}
                                    </div>
                                </div>
                            )}

                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="px-3 py-3 border-t border-white/10 bg-black/20 flex gap-2">
                            <input
                                className="flex-1 bg-black/20 text-white/90 px-3 py-2 rounded-xl text-sm 
                  border border-white/10 focus:outline-none
                  focus:border-white/20 transition"
                                placeholder="Ask HaiIntel something…"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                            />
                            <button
                                onClick={() => send()}
                                className="px-4 py-2 rounded-xl bg-white/90 text-black font-semibold 
                  hover:bg-white transition"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
