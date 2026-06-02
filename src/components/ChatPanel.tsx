import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowUpRight, Scale, BookmarkPlus, HelpCircle, Check, ChevronUp, ChevronDown, CheckSquare, Square, Globe, X, Copy, Sparkles } from 'lucide-react';
import { Message, WorkspaceDocument } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { toast } from 'react-hot-toast';

// Preprocessor helper to wrap raw text citations into markdown legal-protocol links (cite://)
export function preprocessLegalCitations(text: string): string {
  if (!text) return text;
  let processed = text;

  // 1. G.R. No. 167614 (Serrano)
  processed = processed.replace(/(?<!\[)(G\.R\.\s*No\.\s*167614|Serrano\s*v\.\s*Gallant(?:\s*Maritime)?(?:\s*Services)?)(?!\])/gi, (match) => {
    return `[${match}](cite://serrano-167614)`;
  });

  // 2. G.R. No. 124293 (JG Summit)
  processed = processed.replace(/(?<!\[)(G\.R\.\s*No\.\s*124293|JG\s*Summit\s*Holdings)(?!\])/gi, (match) => {
    return `[${match}](cite://jg-summit-124293)`;
  });

  // 3. Constitution Article III Section 1
  processed = processed.replace(/(?<!\[)(Article\s*III,?\s*Section\s*1|Section\s*1,\s*Article\s*III|Section\s*1\s*of\s*Article\s*III|Article\s*III\s*Section\s*1|Art\.\s*III,\s*Sec\.\s*1)(?!\])/gi, (match) => {
    return `[${match}](cite://consti-law-bill-of-rights/consti-sec-1)`;
  });

  // 4. Constitution Article III Section 2
  processed = processed.replace(/(?<!\[)(Article\s*III,?\s*Section\s*2|Section\s*2,\s*Article\s*III|Section\s*2\s*of\s*Article\s*III|Article\s*III\s*Section\s*2|Art\.\s*III,\s*Sec\.\s*2)(?!\])/gi, (match) => {
    return `[${match}](cite://consti-law-bill-of-rights/consti-sec-2)`;
  });

  // 5. Constitution Article III Section 3
  processed = processed.replace(/(?<!\[)(Article\s*III,?\s*Section\s*3|Section\s*3,\s*Article\s*III|Section\s*3\s*of\s*Article\s*III|Article\s*III\s*Section\s*3|Art\.\s*III,\s*Sec\.\s*3)(?!\])/gi, (match) => {
    return `[${match}](cite://consti-law-bill-of-rights/consti-sec-3)`;
  });

  // 6. Constitution Article III Section 4
  processed = processed.replace(/(?<!\[)(Article\s*III,?\s*Section\s*4|Section\s*4,\s*Article\s*III|Section\s*4\s*of\s*Article\s*III|Article\s*III\s*Section\s*4|Art\.\s*III,\s*Sec\.\s*4)(?!\])/gi, (match) => {
    return `[${match}](cite://consti-law-bill-of-rights/consti-sec-4)`;
  });

  // 7. Labor Article 294 (Security of Tenure)
  processed = processed.replace(/(?<!\[)(Article\s*294|Art\.\s*294)(?!\])/gi, (match) => {
    return `[${match}](cite://labor-law-tenure/labor-sec-security-of-tenure)`;
  });

  // 8. Labor Article 297 (Just Causes)
  processed = processed.replace(/(?<!\[)(Article\s*297|Art\.\s*297)(?!\])/gi, (match) => {
    return `[${match}](cite://labor-law-tenure/labor-sec-just-causes)`;
  });

  // 9. Labor Article 298 (Authorized Causes)
  processed = processed.replace(/(?<!\[)(Article\s*298|Art\.\s*298)(?!\])/gi, (match) => {
    return `[${match}](cite://labor-law-tenure/labor-sec-authorized-causes)`;
  });

  // 10. RPC Article 11(1) (Self-Defense)
  processed = processed.replace(/(?<!\[)(Article\s*11,\s*(?:paragraph|paragraph\s*No\.)\s*1|Article\s*11\(1\)|Art\.\s*11\(1\)|Article\s*11\s*paragraph\s*1)(?!\])/gi, (match) => {
    return `[${match}](cite://criminal-law-justifying/crim-sec-self-defense)`;
  });

  // 11. RPC Article 11(2) (Defense of Relatives)
  processed = processed.replace(/(?<!\[)(Article\s*11,\s*(?:paragraph|paragraph\s*No\.)\s*2|Article\s*11\(2\)|Art\.\s*11\(2\)|Article\s*11\s*paragraph\s*2)(?!\])/gi, (match) => {
    return `[${match}](cite://criminal-law-justifying/crim-sec-defense-relatives)`;
  });

  // 12. RPC Article 11(4) (State of Necessity)
  processed = processed.replace(/(?<!\[)(Article\s*11,\s*(?:paragraph|paragraph\s*No\.)\s*4|Article\s*11\(4\)|Art\.\s*11\(4\)|Article\s*11\s*paragraph\s*4)(?!\])/gi, (match) => {
    return `[${match}](cite://criminal-law-justifying/crim-sec-avoid-evil)`;
  });

  // 13. Civil Code Article 19 (Abuse of Rights)
  processed = processed.replace(/(?<!\[)(Article\s*19|Art\.\s*19)(?!\])(?!\s*of\s*the\s*Labor)/gi, (match) => {
    return `[${match}](cite://civil-law-human-relations/civil-sec-abuse-of-rights)`;
  });

  // 14. Civil Code Article 20
  processed = processed.replace(/(?<!\[)(Article\s*20|Art\.\s*20)(?!\])/gi, (match) => {
    return `[${match}](cite://civil-law-human-relations/civil-sec-general-liability)`;
  });

  // 15. Civil Code Article 21
  processed = processed.replace(/(?<!\[)(Article\s*21|Art\.\s*21)(?!\])/gi, (match) => {
    return `[${match}](cite://civil-law-human-relations/civil-sec-contrary-morals)`;
  });

  // 16. Civil Code Article 22
  processed = processed.replace(/(?<!\[)(Article\s*22|Art\.\s*22)(?!\])/gi, (match) => {
    return `[${match}](cite://civil-law-human-relations/civil-sec-unjust-enrichment)`;
  });

  // 17. Civil Code Article 26
  processed = processed.replace(/(?<!\[)(Article\s*26|Art\.\s*26)(?!\])/gi, (match) => {
    return `[${match}](cite://civil-law-human-relations/civil-sec-privacy-dignity)`;
  });

  // 18. Rule 130 Section 3 (Original Document Rule)
  processed = processed.replace(/(?<!\[)(Rule\s*130,?\s*Section\s*3|Section\s*3,\s*Rule\s*130|Original\s*Document\s*Rule|Best\s*Evidence\s*Rule)(?!\])/gi, (match) => {
    return `[${match}](cite://court-rules-evidence/evidence-sec-best-evidence)`;
  });

  // 19. Rule 130 Section 10 (Parol Evidence Rule)
  processed = processed.replace(/(?<!\[)(Rule\s*130,?\s*Section\s*10|Section\s*10,\s*Rule\s*130|Parol\s*Evidence\s*Rule)(?!\])/gi, (match) => {
    return `[${match}](cite://court-rules-evidence/evidence-sec-parol-evidence)`;
  });

  // 20. Rule 130 Section 36 (Hearsay Rule)
  processed = processed.replace(/(?<!\[)(Rule\s*130,?\s*Section\s*36|Section\s*36,\s*Rule\s*130|Hearsay\s*Rule)(?!\])/gi, (match) => {
    return `[${match}](cite://court-rules-evidence/evidence-sec-hearsay)`;
  });

  return processed;
}

// Custom link renderer for cite:// protocols
export function createMarkdownComponents(onSourceClick?: (docId: string, sectionId: string) => void) {
  return {
    a({ href, children, ...props }: any) {
      if (href && href.startsWith('cite://')) {
        const path = href.replace('cite://', '');
        const [docId, sectionId] = path.split('/');
        return (
          <button
            onClick={() => {
              if (onSourceClick) onSourceClick(docId, sectionId || '');
            }}
            type="button"
            className="px-1.5 py-0.5 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200/60 font-medium text-amber-800 cursor-pointer transition text-xs inline-flex items-center gap-1 font-sans mx-0.5 shadow-xs select-none active:scale-95 duration-100 align-baseline"
            title="Open grounded reference in panel"
          >
            <span className="text-[#866337]">⚖️</span>
            <span className="underline decoration-dotted decoration-[#866337]/50 hover:decoration-solid font-semibold">{children}</span>
          </button>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#866337] underline hover:text-amber-800" {...props}>
          {children}
        </a>
      );
    }
  };
}

// Stream-animating component for real-time text output revealing character-by-character
function StreamingText({ text, onTick, onComplete, onSourceClick }: { text: string; onTick?: () => void; onComplete?: () => void; onSourceClick?: (docId: string, sectionId: string) => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  const onTickRef = useRef(onTick);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');
    setIsDone(false);
    
    // Subtle typing delay suited for characters (fast enough to be readable, slow enough to satisfy the visual delay)
    const delay = text.length > 800 ? 3 : text.length > 400 ? 5 : 8;

    const intervalId = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
        if (onTickRef.current) onTickRef.current();
      } else {
        clearInterval(intervalId);
        setIsDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  const preprocessedText = React.useMemo(() => {
    return preprocessLegalCitations(displayedText);
  }, [displayedText]);

  const mdComponents = React.useMemo(() => {
    return createMarkdownComponents(onSourceClick);
  }, [onSourceClick]);

  return (
    <div className="markdown-body font-sans leading-relaxed text-slate-800 text-[14px] text-left">
      <Markdown components={mdComponents}>{preprocessedText}</Markdown>
      {!isDone && (
        <span className="inline-block w-1.5 h-3.5 bg-[#866337]/60 ml-0.5 animate-pulse align-middle inline-flex" />
      )}
    </div>
  );
}

// Thought Process Loader for visual feedback
function ThoughtProcessLoader() {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = [
    "Thinking...",
    "Querying workspace...",
    "Analyzing context...",
    "Synthesizing response..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col gap-2 font-sans py-1">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-4 h-4">
          <motion.div
            className="absolute inset-0 rounded-full border-[1.5px] border-slate-200"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-[1.5px] border-[#D97757] border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={stepIndex}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.3 }}
            className="text-[13px] italic font-medium text-slate-500"
          >
            {steps[stepIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface ChatPanelProps {
  currentScene: number;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onSourceClick: (docId: string, sectionId: string) => void;
  targetSearchDocs: string[];
  setTargetSearchDocs: (docs: string[]) => void;
  allDocs: WorkspaceDocument[];
  onTriggerAddToReadingList: (docId: string) => void;
  onOpenReadingList: () => void;
  isFullWidth?: boolean;
  searchWeb: boolean;
  setSearchWeb: (val: boolean) => void;
  hideHeader?: boolean;
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onSourceClick,
  targetSearchDocs,
  setTargetSearchDocs,
  allDocs,
  onTriggerAddToReadingList,
  onOpenReadingList,
  isFullWidth = false,
  searchWeb,
  setSearchWeb,
  hideHeader = false
}: ChatPanelProps) {
  const [inputText, setInputText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleSetInput(e: Event) {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setInputText(customEvent.detail);
        toast.success("Query loaded! Press enter or click send.", { id: "loaded-query" });
      }
    }
    window.addEventListener("set-chat-input", handleSetInput);
    return () => {
      window.removeEventListener("set-chat-input", handleSetInput);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const scrollToBottom = (behavior: 'auto' | 'smooth' = 'auto') => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const presetQuestions = [
    { label: 'Labor Tenure', q: 'Explain security of tenure and regular employment under Article 294 of the Labor Code.' },
    { label: 'Self-Defense', q: 'Explain the three essential elements of Self-Defense under Article 11(1) of the Revised Penal Code.' },
    { label: 'Fruit of Poisonous Tree', q: 'Explain illegal searches and the admissibility of evidence under Article III Section 2/3 of the PH Constitution.' }
  ];

  return (
    <div className={`${isFullWidth ? 'w-full' : 'w-1/2'} flex flex-col bg-[#FAF7F2] border-r border-[#E9E4DB] overflow-hidden transition-all duration-300`} id="lex-chat-panel">
      {/* PERSISTENT HEADER WITH LIVE WEB GROUNDING TOGGLE */}
      {!hideHeader && (
        <div className="bg-[#FCFAF6] border-b border-slate-200/60 px-6 py-4.5 shrink-0 flex items-center justify-between z-10" id="chat-panel-header">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-sans font-bold text-slate-800 text-[11px] tracking-widest uppercase">
              Workspace Assistant
            </span>
          </div>
        </div>
      )}

      {/* QUIET SCROLLABLE MESSAGE STREAM */}
      <div 
        ref={containerRef}
        className={`flex-1 overflow-y-auto ${hideHeader ? 'px-4 py-4 space-y-5' : 'px-8 py-6 space-y-7'} scroll-smooth bg-[#FAF7F2]`} 
        id="chat-messages-container"
      >
        
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            const isTypingPlaceholder = msg.text.includes("Synthesizing") || msg.text.includes("Analyzing") || msg.text === "Synthesizing...";

            const handleCopyText = (t: string) => {
              navigator.clipboard.writeText(t);
              toast.success("Copied to clipboard!", { id: "copied-chat-toast", icon: "📋" });
            };

            return (
              <motion.div
                key={msg.id || index}
                id={`msg-${msg.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} ${hideHeader ? 'max-w-full w-full' : 'max-w-[95%]'} ${isUser ? 'ml-auto' : 'mr-auto'}`}
              >
                {/* Clean, high-fidelity label header with avatar emblems */}
                <div className={`flex items-center gap-2 mb-1.5 text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider ${isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    isUser ? 'bg-[#866337]/10 text-[#866337]' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {isUser ? 'Y' : '⚜️'}
                  </div>
                  <span>{isUser ? 'You' : 'Workspace Law Assistant'}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-medium text-slate-400 normal-case">{msg.timestamp}</span>
                </div>

                {/* Content Paper Bubble: Impeccable borders and typographic rhythm */}
                <div className={`${hideHeader ? 'p-3.5' : 'p-5'} rounded-2xl border text-left transition-all relative group w-full ${
                  isUser 
                    ? `bg-white border-slate-200/80 text-slate-800 text-[13.5px] shadow-3xs font-sans ${hideHeader ? 'px-4 py-2.5' : 'px-5 py-3.5'}` 
                    : 'bg-[#FAF9F5] border-[#E9E4DB] text-slate-900 font-sans text-[14px] leading-relaxed shadow-3xs'
                }`}>
                  {/* Floating Action Bar on Hover */}
                  {!isUser && !isTypingPlaceholder && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.text)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-150 p-1.5 hover:bg-slate-100/80 rounded-lg text-slate-400 hover:text-slate-800 bg-white/90 backdrop-blur-xs border border-slate-200/60 shadow-3xs cursor-pointer active:scale-95 z-20"
                      title="Copy full response"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isTypingPlaceholder ? (
                    <ThoughtProcessLoader />
                  ) : msg.stream && !isUser ? (
                    <StreamingText text={msg.text} onTick={scrollToBottom} onSourceClick={onSourceClick} />
                  ) : (
                    <div>
                      {isUser ? (
                        <span className="whitespace-pre-line font-sans text-[13.5px] text-slate-800 leading-relaxed block text-left">
                          {msg.text}
                        </span>
                      ) : (
                        <div className={`markdown-body text-slate-850 text-[14px] font-sans ${hideHeader ? 'text-left' : 'text-justify'} leading-relaxed`}>
                          <Markdown components={createMarkdownComponents(onSourceClick)}>
                            {preprocessLegalCitations(msg.text)}
                          </Markdown>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Highly structured, clean citation card panels */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 items-center pl-1 select-none">
                    <span className="text-[10px] font-sans text-[#866337] mr-1 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Scale className="w-3 h-3 text-[#866337]/70" /> Grounded Citations:
                    </span>
                    {msg.sources.map((source, idx) => {
                      if (source.url) {
                        return (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-sans text-slate-600 hover:text-slate-950 transition cursor-pointer flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#866337]/50 shadow-3xs hover:shadow-2xs duration-150"
                          >
                            <Globe className="w-3 h-3 text-amber-500" />
                            <span className="font-medium">{source.label}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
                          </a>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => source.docId && onSourceClick(source.docId, source.sectionId || '')}
                          className="text-[11px] font-sans text-slate-600 hover:text-slate-950 transition cursor-pointer flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#866337]/50 shadow-3xs hover:shadow-2xs duration-150"
                        >
                          <span className="font-medium">{source.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Premium Suggestion Pills with hover pop */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && !isTypingPlaceholder && (
                  <div className="mt-3.5 flex flex-wrap gap-2 pl-1 max-w-[95%]">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onSendMessage(prompt)}
                        className="text-[11.5px] font-sans text-[#866337] bg-white border border-[#E9E4DB] hover:border-[#866337] hover:bg-[#FAF9F5] hover:shadow-3xs px-4 py-2 rounded-full transition-all cursor-pointer text-left leading-snug active:scale-[0.98] duration-150"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {messages.length <= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col gap-3 w-full"
          >
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#866337]/60 uppercase text-center mb-1">
              Select an Analytical Inquiry
            </span>
            <div className="grid grid-cols-1 gap-3">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSendMessage(pq.q)}
                  className={`flex flex-col text-left ${hideHeader ? 'px-4 py-3' : 'px-5 py-4'} bg-white hover:bg-[#FAF9F5] border border-slate-200 hover:border-[#866337]/40 rounded-xl hover:shadow-2xs transition-all duration-200 focus:outline-none cursor-pointer group active:scale-[0.99]`}
                >
                  <span className="text-[10px] font-bold font-sans text-[#866337]/65 uppercase tracking-wider group-hover:text-[#866337] transition-colors">
                    {pq.label}
                  </span>
                  <span className="text-[13px] font-sans text-slate-700 font-medium mt-1 leading-snug">
                    {pq.q}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* COMPACT PURE INPUT FIELD */}
      <div className={`${hideHeader ? 'p-3.5 gap-2' : 'p-5 gap-3'} border-t border-slate-200/60 bg-[#FCFAF6] shrink-0 relative flex flex-col`}>
        {/* Target Search Docs Toolbar */}
        <div ref={dropdownRef} className="flex items-center justify-between w-full relative h-6 z-10">
          <button 
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-[11px] font-sans font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 rounded hover:bg-slate-200/50"
          >
            {targetSearchDocs.length === 0 ? "Searching entire workspace" : `Searching ${targetSearchDocs.length} selected doc${targetSearchDocs.length > 1 ? 's' : ''}`}
            {isDropdownOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

        {isDropdownOpen && (
          <div className="absolute bottom-10 left-0 w-[300px] bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden z-20 flex flex-col select-none">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">Select Context</span>
              {targetSearchDocs.length > 0 && (
                <button 
                  onClick={() => {
                    setTargetSearchDocs([]);
                    toast.success('Cleared all chat references');
                  }}
                  className="text-[10px] text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="max-h-[250px] overflow-y-auto w-full">
              {allDocs.map((doc) => {
                const isSelected = targetSearchDocs.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      if (isSelected) {
                        setTargetSearchDocs(targetSearchDocs.filter(id => id !== doc.id));
                        toast.success(`Removed reference: ${doc.tag || doc.title}`, { id: `ref-${doc.id}` });
                      } else {
                        setTargetSearchDocs([...targetSearchDocs, doc.id]);
                        toast.success(`Referencing: ${doc.tag || doc.title}`, { id: `ref-${doc.id}` });
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                       {isSelected ? <CheckSquare className="w-4 h-4 text-[#866337] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                       <span className="text-[12px] font-sans text-slate-700 truncate">{doc.title}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        </div>

        {/* Dynamic active references rendering */}
        {targetSearchDocs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1.5 pb-0.5 select-none animate-fadeIn" id="active-reference-pills-bar">
            <div className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider flex items-center mr-1">
              Active References:
            </div>
            {targetSearchDocs.map(docId => {
              const d = allDocs.find(x => x.id === docId);
              if (!d) return null;
              return (
                <div 
                  key={docId} 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#866337]/10 text-[#866337] border border-[#866337]/20 rounded-lg text-[11px] font-sans font-medium"
                >
                  <span className="max-w-[150px] truncate">{d.tag}</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      setTargetSearchDocs(targetSearchDocs.filter(id => id !== docId));
                      toast.success(`Removed reference: ${d.tag}`, { id: `ref-rem-${docId}` });
                    }}
                    className="hover:text-red-650 cursor-pointer p-0.5 rounded-full hover:bg-[#866337]/15 transition-colors flex items-center justify-center text-slate-400 hover:text-red-500"
                    title={`De-select ${d.title}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 relative z-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Search workspace or ask a question..."
            className="w-full text-[13px] bg-white border border-slate-200 focus:border-[#866337] rounded-xl pl-4 pr-12 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#866337]/25 transition-all font-sans"
            id="chat-input"
          />
          <button
            type="submit"
            id="chat-send-btn"
            className="absolute right-2.5 top-2 p-2 hover:bg-slate-100/80 text-slate-400 hover:text-[#866337] rounded-md transition duration-300 flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center text-[10px] text-slate-400 font-sans tracking-wide">
          Press return to send
        </div>
      </div>
    </div>
  );
}
