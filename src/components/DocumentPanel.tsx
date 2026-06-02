import React, { useRef, useEffect, useState } from 'react';
import { WorkspaceDocument, SavedItem, TodoItem, MemoryData, DocumentHighlight } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import StudyTimer from './StudyTimer';
import { toast } from 'react-hot-toast';
import { 
  X, 
  Clock, 
  Bookmark, 
  CheckCircle,
  Columns,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Globe,
  Database,
  Pencil,
  Trash2,
  Upload,
  Wand2,
  Loader2,
  Pin,
  PinOff,
  Archive,
  Check,
  CheckSquare,
  Square,
  Info,
  Languages,
  Download,
  Printer,
  Search,
  FileText,
  BookOpen,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';

function MemoryCategoryCard({
  title,
  items,
  onAdd,
  onEdit,
  onDelete
}: {
  title: string;
  items: string[];
  onAdd: (text: string) => void;
  onEdit: (index: number, newText: string) => void;
  onDelete: (index: number) => void;
}) {
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-[200px]">
      <h3 className="font-sans font-bold text-[11px] uppercase tracking-widest text-[#866337] mb-3">{title}</h3>
      <ul className="space-y-2 text-[13px] font-sans text-slate-600 flex-1 overflow-y-auto pr-2">
        {items.length === 0 ? <li className="italic text-slate-400 text-xs">Nothing recorded yet.</li> : items.map((p, i) => (
          <li key={i} className="flex gap-2 group min-h-6">
            {editIndex === i ? (
              <div className="flex w-full gap-2 items-center bg-stone-50 p-1 -m-1 rounded border border-stone-200">
                <input 
                  autoFocus
                  className="flex-1 bg-transparent border-none text-[13px] text-slate-800 focus:outline-none px-1" 
                  value={editText} 
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => { if(e.key === 'Enter' && editText.trim()) { onEdit(i, editText.trim()); setEditIndex(null); } else if (e.key === 'Escape') setEditIndex(null); }}
                />
                <button type="button" onClick={() => { if(editText.trim()) { onEdit(i, editText.trim()); setEditIndex(null); } }} className="text-emerald-600 font-bold px-1 text-[11px] uppercase tracking-wider">Save</button>
              </div>
            ) : (
              <div className="flex w-full justify-between items-start gap-4">
                <span className="leading-relaxed"><span className="text-[#866337]/50 mr-1.5">•</span>{p}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 shrink-0 pt-0.5">
                  <button type="button" className="text-slate-300 hover:text-[#866337] p-0.5 transition-colors cursor-pointer" onClick={() => { setEditIndex(i); setEditText(p); }}>
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button type="button" className="text-slate-300 hover:text-red-500 p-0.5 transition-colors cursor-pointer" onClick={() => onDelete(i)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2 items-center">
        <input 
          placeholder="Add unprompted thought..." 
          className="flex-1 text-[12px] bg-transparent border border-transparent hover:border-slate-100 focus:border-slate-200 focus:bg-slate-50 transition-colors rounded-md py-1.5 px-2 text-slate-700 placeholder:text-slate-400 focus:outline-none" 
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && newItem.trim()) { onAdd(newItem.trim()); setNewItem(''); } }}
        />
        <button type="button" onClick={() => { if(newItem.trim()) { onAdd(newItem.trim()); setNewItem(''); } }} className="text-slate-400 hover:bg-slate-100 hover:text-[#866337] p-1.5 rounded-md transition cursor-pointer">
          <Plus className="w-4 h-4"/>
        </button>
      </div>
    </div>
  )
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const getRanges = (text: string, searchQuery: string, highlights: any[]) => {
  const ranges: { start: number; end: number; type: 'search' | 'highlight'; highlight?: any }[] = [];
  
  // 1. Find all highlights matches
  highlights.forEach(h => {
    if (!h.text) return;
    let pos = 0;
    const lowerText = text.toLowerCase();
    const hText = h.text.toLowerCase();
    while (true) {
      const idx = lowerText.indexOf(hText, pos);
      if (idx === -1) break;
      ranges.push({
        start: idx,
        end: idx + h.text.length,
        type: 'highlight',
        highlight: h
      });
      pos = idx + h.text.length;
    }
  });

  // 2. Find search query matches
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    let pos = 0;
    const lowerText = text.toLowerCase();
    while (true) {
      const idx = lowerText.indexOf(q, pos);
      if (idx === -1) break;
      ranges.push({
        start: idx,
        end: idx + q.length,
        type: 'search'
      });
      pos = idx + q.length;
    }
  }

  // 3. Sort ranges by start index ascending, and by length descending on tie
  ranges.sort((a, b) => b.start - a.start || (b.end - b.start) - (a.end - a.start));

  // 4. Resolve overlaps: keep the first (earliest/lowest index) and discard any overlapping
  const cleanRanges: typeof ranges = [];
  let lastStart = Infinity;
  for (const r of ranges) {
    if (r.end <= lastStart) {
      cleanRanges.push(r);
      lastStart = r.start;
    }
  }
  cleanRanges.reverse();
  return cleanRanges;
};

const renderTextWithRanges = (
  text: string, 
  cleanRanges: any[], 
  onHighlightClick: (h: any) => void,
  activeHighlight: any
) => {
  if (cleanRanges.length === 0) return <>{text}</>;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  cleanRanges.forEach((r, idx) => {
    if (r.start > lastIndex) {
      elements.push(<span key={`text-${idx}`}>{text.substring(lastIndex, r.start)}</span>);
    }

    const rangeText = text.substring(r.start, r.end);
    if (r.type === 'search') {
      elements.push(
        <mark 
          key={`search-${idx}`} 
          className="bg-amber-150 text-amber-950 font-serif px-0.5 rounded shadow-3xs transition-all duration-200"
        >
          {rangeText}
        </mark>
      );
    } else {
      const h = r.highlight!;
      const isSelected = activeHighlight?.id === h.id;
      
      let colorClasses = '';
      let basisClasses = '';
      if (h.color === 'amber') {
        colorClasses = 'bg-[#FAF6EE] text-amber-950 border-b-2 border-[#D4AF37] hover:bg-amber-100/45';
        basisClasses = 'bg-amber-250 text-amber-950 border border-amber-500 shadow-3xs';
      } else if (h.color === 'blue') {
        colorClasses = 'bg-blue-50 text-indigo-950 border-b-2 border-[#5F9EA0] hover:bg-blue-100/45';
        basisClasses = 'bg-blue-200 text-indigo-950 border border-indigo-500 shadow-3xs';
      } else if (h.color === 'emerald') {
        colorClasses = 'bg-emerald-50 text-emerald-955 border-b-2 border-[#2E8B57] hover:bg-emerald-100/45';
        basisClasses = 'bg-emerald-200 text-emerald-950 border border-emerald-500 shadow-3xs';
      } else if (h.color === 'purple') {
        colorClasses = 'bg-purple-50 text-purple-955 border-b-2 border-[#8A2BE2] hover:bg-purple-100/45';
        basisClasses = 'bg-purple-200 text-purple-950 border border-purple-500 shadow-3xs';
      }

      const hasBasis = h.basisText && h.basisText.trim() && rangeText.toLowerCase().includes(h.basisText.trim().toLowerCase());
      const renderedContent = (() => {
        if (!hasBasis) return rangeText;
        const bText = h.basisText.trim();
        const start = rangeText.toLowerCase().indexOf(bText.toLowerCase());
        const before = rangeText.substring(0, start);
        const actualBasisText = rangeText.substring(start, start + bText.length);
        const after = rangeText.substring(start + bText.length);
        
        return (
          <>
            {before}
            <span 
              className={`inline-block mx-0.5 px-1 rounded-sm text-[12.5px] font-bold underline underline-offset-2 decoration-2 decoration-stone-850 ${basisClasses}`}
              title={`Direct Basis Citation: "${actualBasisText}"`}
            >
              {actualBasisText}
            </span>
            {after}
          </>
        );
      })();

      elements.push(
        <span
          key={`hl-${h.id}-${idx}`}
          data-hl-id={h.id}
          style={{ whiteSpace: 'pre-wrap' }}
          onClick={(e) => {
            e.stopPropagation();
            onHighlightClick(h);
          }}
          className={`cursor-pointer transition-all duration-200 px-0.5 rounded-sm font-serif select-text ${colorClasses} ${
            isSelected ? 'ring-2 ring-indigo-505 bg-indigo-100/60 font-bold scale-[1.01]' : ''
          }`}
          title={h.note ? `Note: "${h.note}"` : `Basis / Annotation details`}
        >
          {renderedContent}
        </span>
      );
    }

    lastIndex = r.end;
  });

  if (lastIndex < text.length) {
    elements.push(<span key="text-end">{text.substring(lastIndex)}</span>);
  }

  return <>{elements}</>;
};

// A highly sophisticated, completely offline reactive document translator dictionary mappers
const translateText = (text: string, language: 'english' | 'spanish' | 'tagalog' | 'french' | 'japanese'): string => {
  if (language === 'english') return text;
  
  const dictionary: Record<string, [RegExp, string | ((m: string) => string)][]> = {
    spanish: [
      [/Constitution of the Republic/gi, "Constitución de la República"],
      [/Bill of Rights/gi, "Declaración de Derechos"],
      [/Section (\d+)/gi, "Sección $1"],
      [/Article (\d+)/gi, "Artículo $1"],
      [/Effective Date/gi, "Fecha de Entrada en Vigor"],
      [/Share Purchase Agreement/gi, "Contrato de Compraventa de Acciones"],
      [/No person shall be deprived of life, liberty, or property without due process of law/gi, "Ninguna persona será privada de la vida, la libertad o la propiedad sin el debido proceso legal"],
      [/equal protection of the laws/gi, "igual protección de las leyes"],
      [/The Congress may, by law, adopt a new name/gi, "El Congreso podrá, por ley, adoptar un nuevo nombre"],
      [/Agreement/g, "Contrato"],
      [/buyer/gi, "comprador"],
      [/seller/gi, "vendedor"],
      [/company/gi, "compañía"],
      [/shares/gi, "acciones"],
      [/purchase/gi, "compra"],
      [/escrow/gi, "fideicomiso"],
      [/working capital/gi, "capital de trabajo"],
      [/self-defense/gi, "legítima defensa"],
      [/defense of relatives/gi, "defensa de parientes"],
      [/original document rule/gi, "regla del documento original"],
      [/hearsay and exceptions/gi, "testimonio de oídas y excepciones"],
      [/abuse of rights/gi, "abuso de derecho"],
      [/unjust enrichment/gi, "enriquecimiento injusto"],
      [/the people/gi, "el pueblo"],
      [/shall take effect/gi, "entrará en vigor"],
      [/This Agreement is dated/gi, "Este Contrato tiene fecha de"],
      [/the parties agree/gi, "las partes acuerdan"],
      [/by and among/gi, "por y entre"],
      [/In witness whereof/gi, "En fe de lo cual"],
      [/Core Constitutional Issue/gi, "Asunto Constitucional Central"],
      [/Justifying Circumstances/gi, "Circunstancias Eximentes Justificativas"]
    ],
    tagalog: [
      [/Constitution of the Republic/gi, "Saligang Batas ng Republika"],
      [/Bill of Rights/gi, "Katipunan ng mga Karapatan"],
      [/Section (\d+)/gi, "Seksyon $1"],
      [/Article (\d+)/gi, "Artikulo $1"],
      [/Effective Date/gi, "Petsa ng Pagpapatupad"],
      [/Share Purchase Agreement/gi, "Kasunduan sa Pagbili ng mga Share"],
      [/No person shall be deprived of life, liberty, or property without due process of law/gi, "Walang sinumang tao ang magkakait ng buhay, kalayaan, o ari-arian nang walang angkop na proseso ng batas"],
      [/equal protection of the laws/gi, "pantay na proteksyon ng mga batas"],
      [/Agreement/g, "Kasunduan"],
      [/buyer/gi, "mamimili"],
      [/seller/gi, "nagbebenta"],
      [/company/gi, "kumpanya"],
      [/shares/gi, "mga share"],
      [/purchase/gi, "pagbili"],
      [/working capital/gi, "gumaganang puhunan"],
      [/self-defense/gi, "pagtatanggol sa sarili"],
      [/defense of relatives/gi, "pagtatanggol sa mga kamag-anak"],
      [/original document rule/gi, "panuntunan sa orihinal na dokumento"],
      [/abuse of rights/gi, "pang-aabuso sa mga karapatan"],
      [/unjust enrichment/gi, "di-makatwirang pagpapayaman"],
      [/the people/gi, "mga mamamayan"]
    ],
    french: [
      [/Constitution of the Republic/gi, "Constitution de la République"],
      [/Bill of Rights/gi, "Déclaration des Droits"],
      [/Section (\d+)/gi, "Section $1"],
      [/Article (\d+)/gi, "Article $1"],
      [/Effective Date/gi, "Date d'entrée en vigueur"],
      [/Share Purchase Agreement/gi, "Contrat d'Achat d'Actions"],
      [/No person shall be deprived of life, liberty, or property without due process of law/gi, "Nul ne sera privé de sa vie, de sa liberté ou de ses biens sans procédure légale régulière"],
      [/equal protection of the laws/gi, "égale protection des lois"],
      [/Agreement/g, "Accord / Contrat"],
      [/buyer/gi, "acheteur"],
      [/seller/gi, "vendeur"],
      [/company/gi, "société"],
      [/shares/gi, "actions"],
      [/purchase/gi, "achat"],
      [/working capital/gi, "fonds de roulement"],
      [/self-defense/gi, "légitime défense"],
      [/abuse of rights/gi, "abus de droit"],
      [/unjust enrichment/gi, "enrichissement sans cause"],
      [/This Agreement is dated/gi, "Cet Accord est daté du"],
      [/the parties agree/gi, "les parties conviennent"],
      [/In witness whereof/gi, "En foi de quoi"],
      [/Core Constitutional Issue/gi, "Question Constitutionnelle Centrale"]
    ],
    japanese: [
      [/Constitution of the Republic/gi, "共和国憲法"],
      [/Bill of Rights/gi, "人権宣言"],
      [/Section (\d+)/gi, "第$1条"],
      [/Article (\d+)/gi, "第$1条"],
      [/Effective Date/gi, "発効日"],
      [/Share Purchase Agreement/gi, "株式譲渡契約書"],
      [/No person shall be deprived of life, liberty, or property without due process of law/gi, "何人も、法の適正な手続によらなければ、その生命、自由又は財産を奪はれない"],
      [/equal protection of the laws/gi, "法の下の平等な保護"],
      [/Agreement/g, "契約書"],
      [/buyer/gi, "買主"],
      [/seller/gi, "売主"],
      [/company/gi, "対象会社"],
      [/shares/gi, "所有株式"],
      [/purchase/gi, "買収価格"],
      [/working capital/gi, "運転資金"],
      [/self-defense/gi, "正当防衛"],
      [/abuse of rights/gi, "権利の濫用"],
      [/unjust enrichment/gi, "不当利得"]
    ]
  };

  const replacements = dictionary[language];
  if (!replacements) return text;

  let currentText = text;
  for (const [pattern, rep] of replacements) {
    if (typeof rep === 'string') {
      currentText = currentText.replace(pattern, rep);
    } else {
      currentText = currentText.replace(pattern, rep as any);
    }
  }

  return currentText;
};

interface DocumentPanelProps {
  isReadingMode?: boolean;
  onToggleReadingMode?: () => void;
  isReadingModeChatOpen?: boolean;
  onToggleReadingModeChat?: () => void;
  openTabs: string[];
  pinnedTabs?: string[];
  onTogglePinTab?: (id: string) => void;
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  onCloseTab: (id: string) => void;
  allDocs: WorkspaceDocument[];
  readingList: SavedItem[];
  onToggleStatus: (id: string) => void;
  onRemoveFromReadingList: (id: string) => void;
  scrolledSectionId: string;
  setScrolledSectionId: (id: string) => void;
  onOpenReadingList?: () => void;
  todos?: TodoItem[];
  onToggleTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
  onAddTodo?: (text: string) => void;
  onClearCompletedTodos?: () => void;
  onResetTodos?: (newTodos: TodoItem[]) => void;
  memory?: MemoryData;
  onUpdateMemory?: (newMemory: MemoryData) => void;
  onAddSource?: (doc: WorkspaceDocument) => void;
  onUpdateDoc?: (doc: WorkspaceDocument) => void;
  onDeleteDoc?: (id: string) => void;
  onOpenTab?: (id: string) => void;
  onCreateDoc?: () => void;
  targetSearchDocs?: string[];
  setTargetSearchDocs?: (ids: string[]) => void;
}

export default function DocumentPanel({
  isReadingMode = false,
  onToggleReadingMode = () => {},
  isReadingModeChatOpen = false,
  onToggleReadingModeChat = () => {},
  openTabs,
  pinnedTabs = [],
  onTogglePinTab = () => {},
  activeTabId,
  setActiveTabId,
  onCloseTab,
  allDocs,
  readingList,
  onToggleStatus,
  onRemoveFromReadingList,
  scrolledSectionId,
  setScrolledSectionId,
  onOpenReadingList,
  todos = [],
  onToggleTodo = () => {},
  onDeleteTodo = () => {},
  onAddTodo = () => {},
  onClearCompletedTodos = () => {},
  onResetTodos = () => {},
  memory = { preferences: [], longTerm: [], episodic: [], shortTerm: [] },
  onUpdateMemory = () => {},
  onAddSource,
  onUpdateDoc = () => {},
  onDeleteDoc = () => {},
  onOpenTab = () => {},
  onCreateDoc = () => {},
  targetSearchDocs = [],
  setTargetSearchDocs
}: DocumentPanelProps) {
  
  const [selectionRange, setSelectionRange] = useState<{ text: string; rect: DOMRect | null } | null>(null);
  const [showAnnotationCreator, setShowAnnotationCreator] = useState(false);
  const [newHighlightText, setNewHighlightText] = useState('');
  const [newHighlightNote, setNewHighlightNote] = useState('');
  const [selectedColor, setSelectedColor] = useState<'amber' | 'blue' | 'emerald' | 'purple'>('amber');
  const [editingHighlight, setEditingHighlight] = useState<any>(null);
  const [activeHighlight, setActiveHighlight] = useState<any>(null);
  const [newBasisText, setNewBasisText] = useState('');

  // Dropdown states for premium bar actions
  const [showAboutPanel, setShowAboutPanel] = useState(false);
  const [showTranslatePopover, setShowTranslatePopover] = useState(false);
  const [translationLanguage, setTranslationLanguage] = useState<'english' | 'spanish' | 'tagalog' | 'french' | 'japanese'>('english');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleHighlightClick = (h: any) => {
    setActiveHighlight(h);
  };

  const activeDoc = allDocs.find(d => d.id === activeTabId);

  const handleTextSelection = (e: React.MouseEvent) => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setSelectionRange(null);
        return;
      }
      
      const text = selection.toString().trim();
      const scroller = document.getElementById(`scroller-${activeTabId}`);
      if (!scroller) return;
      
      if (scroller.contains(selection.anchorNode)) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectionRange({ text, rect });
        } catch (err) {
          console.error("Selection boundary error", err);
        }
      }
    }, 50);
  };

  const handleScrollToHighlight = (hId: string) => {
    const parent = document.getElementById(`scroller-${activeTabId}`);
    if (!parent) return;
    const targetElement = parent.querySelector(`[data-hl-id="${hId}"]`) as HTMLElement | null;
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('ring-4', 'ring-indigo-400/50', 'bg-indigo-100');
      setTimeout(() => {
        targetElement.classList.remove('ring-4', 'ring-indigo-400/50', 'bg-indigo-100');
      }, 1500);
    }
  };

  const [newTodoText, setNewTodoText] = useState<string>('');
  
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [editDocTitle, setEditDocTitle] = useState('');
  const [editDocContent, setEditDocContent] = useState('');
  const [editDocCategory, setEditDocCategory] = useState('');
  const [editDocTag, setEditDocTag] = useState('');
  const [isTagging, setIsTagging] = useState(false);
  const [kbTab, setKbTab] = useState<'active' | 'archived'>('active');

  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [filterMatchingOnly, setFilterMatchingOnly] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);

  useEffect(() => {
    setDocSearchQuery('');
    setFilterMatchingOnly(false);
    setActiveHighlightIndex(0);
    setTranslationLanguage('english'); // Reset language when switching tabs
  }, [activeTabId]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const escaped = escapeRegExp(query);
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) => (
          part.toLowerCase() === query.toLowerCase() ? (
            <mark 
              key={index} 
              className="bg-amber-150 text-amber-950 font-serif px-0.5 rounded shadow-3xs transition-all duration-200"
            >
              {part}
            </mark>
          ) : part
        ))}
      </>
    );
  };

  const getMatchCount = (doc: WorkspaceDocument) => {
    if (!docSearchQuery) return 0;
    let count = 0;
    const query = docSearchQuery.toLowerCase();
    
    if (doc.title.toLowerCase().includes(query)) {
      const matched = doc.title.match(new RegExp(escapeRegExp(query), 'gi'));
      if (matched) count += matched.length;
    }
    if (doc.subtitle && doc.subtitle.toLowerCase().includes(query)) {
      const matched = doc.subtitle.match(new RegExp(escapeRegExp(query), 'gi'));
      if (matched) count += matched.length;
    }

    doc.sections.forEach(sec => {
      if (sec.title && sec.title.toLowerCase().includes(query)) {
        const matched = sec.title.match(new RegExp(escapeRegExp(query), 'gi'));
        if (matched) count += matched.length;
      }
      if (sec.text && sec.text.toLowerCase().includes(query)) {
        const matched = sec.text.match(new RegExp(escapeRegExp(query), 'gi'));
        if (matched) count += matched.length;
      }
    });

    return count;
  };

  const handleScrollToMatch = (index: number) => {
    setTimeout(() => {
      const parent = document.getElementById(`scroller-${activeTabId}`);
      if (!parent) return;
      const markers = parent.querySelectorAll("mark");
      if (markers.length > 0) {
        const safeIndex = (index % markers.length + markers.length) % markers.length;
        markers.forEach((m, idx) => {
          if (idx === safeIndex) {
            m.classList.add('ring-2', 'ring-amber-500', '!bg-amber-400', 'scale-105', 'z-20');
            m.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            m.classList.remove('ring-2', 'ring-amber-500', '!bg-amber-400', 'scale-105', 'z-20');
          }
        });
      }
    }, 40);
  };

  const handleDownloadFile = () => {
    if (!activeDoc) {
      toast.error("No active document to download.");
      return;
    }
    const documentTitle = activeDoc.title;
    const documentSubtitle = activeDoc.subtitle || '';
    const bodyText = activeDoc.sections.map(s => `${s.title ? `## ${s.title}\n\n` : ''}${s.text}`).join('\n\n');
    const fullText = `# ${documentTitle}\n${documentSubtitle ? `*${documentSubtitle}*\n\n` : '\n'}${bodyText}`;
    
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Format a nice file name
    const fileName = `${documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded "${fileName}" successfully!`, { icon: '💾' });
  };

  const markdownComponents = {
    p: ({ children }: any) => {
      const renderChild = (child: any, keyIdx: number): any => {
        if (typeof child === 'string') {
          // Translate dynamic text block
          const translatedBlock = translateText(child, translationLanguage);
          const ranges = getRanges(translatedBlock, docSearchQuery, activeDoc?.highlights || []);
          return <span key={keyIdx}>{renderTextWithRanges(translatedBlock, ranges, handleHighlightClick, activeHighlight)}</span>;
        }
        if (React.isValidElement(child)) {
          const props = child.props as any;
          if (props && props.children) {
            const processedChildren = React.Children.map(props.children, (nestedChild, nestedIdx) => 
              renderChild(nestedChild, nestedIdx)
            );
            return React.cloneElement(child, { key: keyIdx } as any, processedChildren);
          }
        }
        return child;
      };

      const childrenArray = React.Children.toArray(children);
      return (
        <p className="mb-5 leading-relaxed text-slate-800 text-justify text-[13.5px]">
          {childrenArray.map((child, idx) => renderChild(child, idx))}
        </p>
      );
    },
    li: ({ children }: any) => {
      const renderChild = (child: any, keyIdx: number): any => {
        if (typeof child === 'string') {
          const translatedBlock = translateText(child, translationLanguage);
          const ranges = getRanges(translatedBlock, docSearchQuery, activeDoc?.highlights || []);
          return <span key={keyIdx}>{renderTextWithRanges(translatedBlock, ranges, handleHighlightClick, activeHighlight)}</span>;
        }
        if (React.isValidElement(child)) {
          const props = child.props as any;
          if (props && props.children) {
            const processedChildren = React.Children.map(props.children, (nestedChild, nestedIdx) => 
              renderChild(nestedChild, nestedIdx)
            );
            return React.cloneElement(child, { key: keyIdx } as any, processedChildren);
          }
        }
        return child;
      };

      const childrenArray = React.Children.toArray(children);
      return (
        <li className="mb-2 leading-relaxed text-slate-800 text-[13.5px]">
          {childrenArray.map((child, idx) => renderChild(child, idx))}
        </li>
      );
    },
    h1: ({ children }: any) => {
      const textVal = typeof children === 'string' ? translateText(children, translationLanguage) : children;
      return <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 mt-8 uppercase tracking-wide">{typeof textVal === 'string' ? highlightText(textVal, docSearchQuery) : textVal}</h2>;
    },
    h2: ({ children }: any) => {
      const textVal = typeof children === 'string' ? translateText(children, translationLanguage) : children;
      return <h3 className="text-md font-serif font-semibold text-slate-850 mb-3 mt-6">{typeof textVal === 'string' ? highlightText(textVal, docSearchQuery) : textVal}</h3>;
    },
    h3: ({ children }: any) => {
      const textVal = typeof children === 'string' ? translateText(children, translationLanguage) : children;
      return <h4 className="text-sm font-serif font-semibold text-slate-8 w mb-2 mt-4">{typeof textVal === 'string' ? highlightText(textVal, docSearchQuery) : textVal}</h4>;
    },
    h4: ({ children }: any) => {
      const textVal = typeof children === 'string' ? translateText(children, translationLanguage) : children;
      return <h5 className="text-[12.5px] font-serif font-semibold text-slate-700 mb-1 mt-3 italic">{typeof textVal === 'string' ? highlightText(textVal, docSearchQuery) : textVal}</h5>;
    },
  };

  const handleAddTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    onAddTodo(newTodoText.trim());
    setNewTodoText('');
  };

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const currentDoc = allDocs.find(d => d.id === activeTabId);
    if (currentDoc && activeTabId.startsWith('doc-new-') && currentDoc.title === 'Untitled Document' && (currentDoc.content === '' || currentDoc.content === undefined)) {
      setIsEditingDoc(true);
      setEditDocTitle(currentDoc.title);
      setEditDocCategory(currentDoc.category);
      setEditDocTag(currentDoc.tag);
      setEditDocContent(currentDoc.content || currentDoc.sections.map(s => s.text).join('\n\n'));
    } else {
      setIsEditingDoc(false);
      setEditDocTitle(currentDoc?.title || '');
      setEditDocCategory(currentDoc?.category || '');
      setEditDocTag(currentDoc?.tag || '');
      setEditDocContent(currentDoc?.content || currentDoc?.sections.map(s => s.text).join('\n\n') || '');
    }
  }, [activeTabId]);

  useEffect(() => {
    if (scrolledSectionId && sectionRefs.current[scrolledSectionId]) {
      sectionRefs.current[scrolledSectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [scrolledSectionId]);

  const renderDocumentPaper = (doc: WorkspaceDocument | undefined, isCompact = false) => {
    if (!doc) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#FAF6EE] text-center" id="empty-document-paper">
          <p className="text-xs text-slate-400 font-serif italic">No item selected</p>
        </div>
      );
    }
    if (isEditingDoc && !isCompact) {
      return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#F4F1EB]" id={`paper-${doc.id}-edit`}>
          <div className="border-b border-slate-200/60 px-8 py-4 shrink-0 bg-[#FCFAF6] flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-widest font-bold text-gold-dark uppercase">
              Editing Document
            </span>
            <div className="flex gap-2">
              <button 
                onClick={async () => {
                  setIsTagging(true);
                  try {
                    const res = await fetch('/api/tag', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: editDocTitle, content: editDocContent })
                    });
                    if (res.ok) {
                      const data = await res.json();
                      if (data.category) setEditDocCategory(data.category);
                      if (data.tag) setEditDocTag(data.tag);
                    }
                  } catch (e) {
                    console.error("Auto tag failed", e);
                  } finally {
                    setIsTagging(false);
                  }
                }}
                disabled={isTagging}
                className="text-xs px-3 py-1.5 border border-[#E8E4DA] bg-white rounded text-[#866337] hover:bg-slate-50 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {isTagging ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                Auto Tag
              </button>
              <button 
                onClick={() => setIsEditingDoc(false)}
                className="text-xs px-3 py-1.5 border border-slate-200 rounded text-slate-500 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const updatedDoc = {
                    ...doc,
                    title: editDocTitle,
                    content: editDocContent,
                    category: editDocCategory || doc.category,
                    tag: editDocTag || doc.tag,
                    sections: [{
                      id: `sec-${Date.now()}`,
                      title: '',
                      text: editDocContent
                    }]
                  };
                  onUpdateDoc(updatedDoc);
                  setIsEditingDoc(false);
                  setShowSavedIndicator(true);
                  setTimeout(() => {
                    setShowSavedIndicator(false);
                  }, 4000);
                  toast.success('Changes successfully saved to local storage', {
                    icon: '💾'
                  });
                }}
                className="text-xs px-3 py-1.5 bg-[#866337] text-white rounded hover:bg-[#A3845B] transition shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 md:px-10 py-6 scroll-smooth flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <input 
                value={editDocCategory}
                onChange={e => setEditDocCategory(e.target.value)}
                placeholder="Category"
                className="text-[10px] font-sans tracking-widest font-bold text-gold-dark uppercase bg-transparent border border-slate-200 rounded px-2 py-1 outline-none w-32 placeholder:text-slate-300"
              />
              <input 
                value={editDocTag}
                onChange={e => setEditDocTag(e.target.value)}
                placeholder="Tag"
                className="text-slate-500 font-mono text-[9px] uppercase tracking-wider bg-transparent border border-slate-200 rounded px-2 py-1 outline-none w-32 placeholder:text-slate-300"
              />
            </div>
            <input 
              value={editDocTitle}
              onChange={e => setEditDocTitle(e.target.value)}
              placeholder="Document Title"
              className="text-xl font-serif font-semibold text-slate-900 bg-transparent border-none outline-none w-full placeholder:text-slate-300"
            />
            <textarea
              value={editDocContent}
              onChange={e => setEditDocContent(e.target.value)}
              placeholder="Document content..."
              className="flex-1 w-full bg-transparent border-none outline-none resize-none font-serif text-[14px] leading-relaxed text-slate-800 placeholder:text-slate-300 mt-2"
            />
          </div>
        </div>
      );
    }

    // Solve watermarked exhibit label based on subtitle or a random standard index for visual corporate realism
    const exhibitLabelValue = doc.subtitle && doc.subtitle.includes("Exhibit") 
      ? doc.subtitle.split(" ")[1] 
      : doc.tag || "Exhibit 2.1";

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-[#EEEDEB] relative select-text" id={`paper-${doc.id}`}>
        
        {/* Actions Popovers */}
        <AnimatePresence>
          {showAboutPanel && (
            <div className="absolute top-3 left-6 bg-white border border-slate-200/90 rounded-xl shadow-lg p-5 z-40 w-72 text-left font-sans animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3">
                <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Document Profile</h4>
                <button onClick={() => setShowAboutPanel(false)} className="text-slate-400 hover:text-slate-700 text-[10px]">✕</button>
              </div>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Document Title</span>
                  <span className="font-serif font-semibold text-slate-800 leading-snug">{doc.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Category</span>
                    <span className="bg-slate-50 border border-slate-100 text-slate-700 px-2 py-0.5 rounded-md inline-block font-medium text-[10.5px] mt-0.5">{doc.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Tag Code</span>
                    <span className="text-slate-700 font-mono text-[10.5px] font-bold block mt-0.5">{doc.tag}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Length Stats</span>
                  <span className="text-slate-700 block text-[11px] font-medium leading-relaxed">
                    {doc.sections.reduce((acc, s) => acc + s.text.split(/\s+/).length, 0)} words (~{Math.ceil(doc.sections.reduce((acc, s) => acc + s.text.split(/\s+/).length, 0) / 180)} min read)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Status</span>
                  <span className="text-slate-700 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${doc.isArchived ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
                    {doc.isArchived ? 'Archived Offline' : 'Active Grounded Source'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {showTranslatePopover && (
            <div className="absolute top-3 left-24 bg-white border border-slate-200/90 rounded-xl shadow-lg p-3 z-40 w-48 text-left font-sans animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-2 pb-1.5 border-b border-slate-100 mb-1">Target Language</div>
              <ul className="space-y-0.5">
                {(['english', 'spanish', 'tagalog', 'french', 'japanese'] as const).map(lang => {
                  const displayNames = {
                    english: 'English (Original)',
                    spanish: 'Español (Spanish)',
                    tagalog: 'Filipino (Tagalog)',
                    french: 'Français (French)',
                    japanese: '日本語 (Japanese)'
                  };
                  const isActive = translationLanguage === lang;
                  return (
                    <li key={lang}>
                      <button 
                        onClick={async () => {
                          setShowTranslatePopover(false);
                          setIsTranslating(true);
                          // Animate process for physical system feel
                          await new Promise(r => setTimeout(r, 600));
                          setTranslationLanguage(lang);
                          setIsTranslating(false);
                          toast.success(`Translated block elements to ${displayNames[lang].split(' ')[0]}!`);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-xs transition-colors truncate flex justify-between items-center cursor-pointer ${
                          isActive ? 'bg-amber-500/10 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{displayNames[lang].split(' ')[0]}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-amber-600 stroke-[3.5]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </AnimatePresence>

        {/* FLOATING SEARCH DOCUMENT BAR IN RIGHT AREA OF VIEWPORT */}
        <div className="absolute top-4 right-8 bg-white border border-[#D1D5DB]/80 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.06)] px-3 py-1.5 flex items-center gap-2.5 z-30 animate-in fade-in duration-250">
          <div className="relative flex items-center">
            <input
              type="text"
              value={docSearchQuery}
              onChange={(e) => {
                setDocSearchQuery(e.target.value);
                setActiveHighlightIndex(0);
              }}
              placeholder="Search document"
              className="pl-7 pr-12 py-1 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none font-sans text-[12.5px] h-7 w-44"
              id="local-doc-search-input"
            />
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            {docSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  setDocSearchQuery('');
                  setActiveHighlightIndex(0);
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 font-sans text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Match Indicators / Buttons */}
          {docSearchQuery && getMatchCount(doc) > 0 && (
            <div className="flex items-center gap-1 border-l border-slate-100 pl-2 text-[11px] font-mono shrink-0">
              <span className="text-slate-500 select-none mr-2 font-semibold">
                {activeHighlightIndex + 1}/{getMatchCount(doc)}
              </span>
              <button
                type="button"
                onClick={() => {
                  const total = getMatchCount(doc);
                  const newIndex = (activeHighlightIndex - 1 + total) % total;
                  setActiveHighlightIndex(newIndex);
                  handleScrollToMatch(newIndex);
                }}
                className="p-1 hover:bg-slate-50 rounded text-slate-500 hover:text-slate-850 transition cursor-pointer"
                title="Previous match"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const total = getMatchCount(doc);
                  const newIndex = (activeHighlightIndex + 1) % total;
                  setActiveHighlightIndex(newIndex);
                  handleScrollToMatch(newIndex);
                }}
                className="p-1 hover:bg-slate-50 rounded text-slate-500 hover:text-slate-850 transition cursor-pointer"
                title="Next match"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Translation overlay shimmer */}
        <AnimatePresence>
          {isTranslating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#EEEDEB] flex flex-col items-center justify-center gap-3 z-30"
              key="translate-shimmer"
            >
              <Loader2 className="w-8 h-8 text-[#866337] animate-spin" />
              <span className="text-xs font-sans tracking-wide font-semibold text-slate-600">Translating text layer...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continuous paper scroller */}
        <div 
          className="flex-1 w-full overflow-y-auto px-6 py-10 scroll-smooth flex flex-col" 
          id={`scroller-${doc.id}`}
          onMouseUp={handleTextSelection}
        >
          {/* High Fidelity Simulated Scanned PDF Page Canvas */}
          <div className="max-w-[760px] w-full mx-auto my-3 flex-1 flex flex-col">
            <div 
              className="bg-white border border-[#D0D4DC] rounded-sm px-16 py-16 flex flex-col justify-between font-serif relative flex-1"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.065), 0 2px 8px rgba(0,0,0,0.035)"
              }}
            >
              {/* Top watermark / Tag markup */}
              <div className="absolute top-10 right-16 text-right font-sans text-[10px] font-bold text-slate-400 select-none uppercase tracking-widest">
                {translateText(exhibitLabelValue, translationLanguage)}
              </div>

              <div>
                {/* Active selection active references button */}
                {setTargetSearchDocs && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        const isSelected = targetSearchDocs.includes(doc.id);
                        if (isSelected) {
                          setTargetSearchDocs(targetSearchDocs.filter(id => id !== doc.id));
                          toast.success(`Removed ${doc.tag} from active references`);
                        } else {
                          setTargetSearchDocs([...targetSearchDocs, doc.id]);
                          toast.success(`Set ${doc.tag} as active reference`);
                        }
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8.5px] font-sans font-bold uppercase tracking-wider transition cursor-pointer border ${
                        targetSearchDocs.includes(doc.id)
                          ? 'bg-[#866337]/10 text-[#866337] border-[#866337]/20'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-500 border-stone-200'
                      }`}
                    >
                      <Check className={`w-2.5 h-2.5 ${targetSearchDocs.includes(doc.id) ? 'text-[#866337]' : 'text-slate-350'}`} />
                      <span>{targetSearchDocs.includes(doc.id) ? "✓ Reference Active" : "Use as Chat Reference"}</span>
                    </button>
                    
                    <AnimatePresence>
                      {showSavedIndicator && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          className="inline-flex items-center gap-1.5 text-[10px] text-emerald-650 font-sans font-medium ml-3"
                          key="saved-indicator-pill-internal"
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                          Changes saved
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Subtitle Classification header */}
                <div className="text-[10px] font-sans tracking-widest font-bold text-gold-dark uppercase mb-1">
                  {translateText(doc.category, translationLanguage)} Reference Source
                </div>

                {/* Main title printout */}
                <h2 className="font-serif font-bold text-slate-900 leading-tight tracking-tight text-[22px] border-b border-slate-100 pb-5 mb-6">
                  {translateText(doc.title, translationLanguage)}
                </h2>

                {/* Optional subtitle readout */}
                {doc.subtitle && (
                  <p className="text-slate-500 font-serif italic text-[12px] leading-relaxed mb-6 -mt-3">
                    {translateText(doc.subtitle, translationLanguage)}
                  </p>
                )}

                {/* Dynamic document sections body */}
                <div className="mt-8 space-y-6">
                  {(() => {
                    const displayedSections = (docSearchQuery && filterMatchingOnly)
                      ? doc.sections.filter(sec => 
                          (sec.title && sec.title.toLowerCase().includes(docSearchQuery.toLowerCase())) || 
                          (sec.text && sec.text.toLowerCase().includes(docSearchQuery.toLowerCase()))
                        )
                      : doc.sections;

                    if (displayedSections.length === 0) {
                      return (
                        <div className="text-center py-16 bg-stone-50/50 rounded-xl border border-dashed border-stone-200/80 p-5 mt-4">
                          <p className="text-xs text-stone-500 font-serif italic mb-3">
                            No matching prose fragments found for "{docSearchQuery}".
                          </p>
                          <button
                            type="button"
                            onClick={() => setFilterMatchingOnly(false)}
                            className="text-[11px] font-sans font-bold text-[#866337] hover:underline cursor-pointer"
                          >
                            Show Full Prose Document
                          </button>
                        </div>
                      );
                    }

                    return displayedSections.map((sec) => {
                      const matchedHighlight = doc.highlights.find(h => h.id === sec.highlightId);
                      const isSectionJumped = scrolledSectionId === sec.id;

                      return (
                        <div
                          key={sec.id}
                          ref={el => { if (sec.id) sectionRefs.current[sec.id] = el; }}
                          id={`section-${sec.id}`}
                          className={`transition-all duration-500 pin-section relative ${
                            isSectionJumped 
                              ? 'bg-amber-500/5 border-l-2 border-[#866337] px-3.5 py-2.5 rounded shadow-3xs' 
                              : 'border-l border-transparent py-1'
                          }`}
                        >
                          {/* Inner Section Headers if any */}
                          {sec.title && (
                            <h4 className="text-[10.5px] font-sans font-bold tracking-wider text-[#866337] uppercase mb-2">
                              {highlightText(translateText(sec.title, translationLanguage), docSearchQuery)}
                            </h4>
                          )}

                          {/* Body markdown content processes with translation */}
                          <div className="text-[13.5px] text-slate-850 font-serif leading-relaxed text-justify markdown-body select-text">
                            <Markdown components={markdownComponents}>{sec.text}</Markdown>
                          </div>

                          {/* Embedded Annotation ref notes citation */}
                          {matchedHighlight && matchedHighlight.note && (
                            <div className="mt-3.5 text-slate-650 text-[11.5px] leading-relaxed font-sans italic bg-stone-50 border border-stone-205/65 p-3.5 rounded-lg relative group">
                              <span className="font-sans font-bold uppercase tracking-wider text-[8.5px] text-[#866337] block not-italic mb-1">
                                Footnote / Annotation Insight ({matchedHighlight.label}):
                              </span>
                              {matchedHighlight.note}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Page indicator centered at the bottom, mimicking high fidelity scanned documents */}
              <div className="mt-16 pt-5 border-t border-slate-100 flex items-center justify-between text-slate-400 select-none font-serif text-[11.5px]">
                <span className="font-sans uppercase tracking-[0.12em] font-medium text-[8px]">Grounded Law Reference</span>
                <span>{doc.tag === 'CONSTITUTION' ? 'PAGE 10' : 'Page 1 of 1'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* FLOATING ACTIVE HIGHLIGHT DETAILS POPOVER */}
        {activeHighlight && (
          <div className="absolute bottom-6 right-6 w-80 bg-[#FCFAF6] border border-stone-250/95 rounded-xl shadow-xl z-35 flex flex-col overflow-hidden font-sans text-xs animate-in slide-in-from-bottom-2 duration-300">
            <div className="p-3.5 border-b border-stone-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-1.5 font-semibold text-stone-850">
                <Bookmark className="w-3.5 h-3.5 text-[#866337]" strokeWidth={2.5} />
                <span className="font-serif text-[13px] font-bold text-stone-850">Legal Annotation Ref</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveHighlight(null)}
                className="p-1 px-2 rounded-full hover:bg-stone-100 text-slate-500 transition cursor-pointer font-bold leading-none"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto bg-stone-50/20 text-left">
              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-[#866337] uppercase tracking-wider">Cited Excerpt</span>
                <div className="p-2.5 bg-white border border-stone-200/50 rounded-lg text-stone-750 italic font-serif leading-relaxed text-[11.5px] select-text">
                  "{activeHighlight.text}"
                </div>
              </div>

              {activeHighlight.basisText && (
                <div className="space-y-1">
                  <span className="text-[9.5px] font-bold text-amber-600 uppercase tracking-wider">Evidentiary Basis Phrase</span>
                  <div className="p-2 bg-amber-500/5 border border-amber-500/15 rounded-lg text-stone-900 font-serif font-semibold leading-relaxed text-[12px] underline decoration-amber-500 underline-offset-2 select-text">
                    {activeHighlight.basisText}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[9.5px] font-bold text-stone-500/80 uppercase tracking-wider">Notes & Analytical Comments</span>
                <div className="p-2.5 bg-white border border-stone-200/50 rounded-lg text-stone-850 leading-relaxed font-sans text-[11.5px] whitespace-pre-wrap select-text">
                  {activeHighlight.note || <span className="text-stone-400 italic">No notes or comments added.</span>}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200/60 p-2.5 bg-white flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEditingHighlight(activeHighlight);
                  setNewHighlightText(activeHighlight.text);
                  setNewHighlightNote(activeHighlight.note || '');
                  setNewBasisText(activeHighlight.basisText || '');
                  setSelectedColor(activeHighlight.color || 'amber');
                  setShowAnnotationCreator(true);
                  setActiveHighlight(null);
                }}
                className="px-2.5 py-1 text-[10.5px] font-semibold text-[#866337] hover:bg-[#866337]/5 rounded-md transition cursor-pointer flex items-center gap-1"
              >
                <Pencil className="w-3" />
                <span>Edit Annotation</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const updatedDoc = {
                    ...doc,
                    highlights: doc.highlights.filter((item: any) => item.id !== activeHighlight.id)
                  };
                  onUpdateDoc(updatedDoc);
                  setActiveHighlight(null);
                  toast.success("Annotation removed!");
                }}
                className="px-2.5 py-1 text-[10.5px] font-bold text-red-650 hover:bg-red-50 rounded-md transition cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* FLOATING SELECTION TOOLBAR */}
        {selectionRange && selectionRange.rect && (
          <div 
            className="fixed bg-slate-900 text-white rounded-lg shadow-lg px-3 py-2 flex items-center gap-2.5 z-50 border border-slate-700/50 text-xs font-sans animate-in fade-in duration-200"
            style={{
              top: `${selectionRange.rect.top - 50}px`,
              left: `${Math.max(10, selectionRange.rect.left + (selectionRange.rect.width / 2) - 130)}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-full">
              {(['amber', 'blue', 'emerald', 'purple'] as const).map(c => {
                let bg = 'bg-amber-400';
                if (c === 'blue') bg = 'bg-blue-400';
                if (c === 'emerald') bg = 'bg-emerald-450';
                if (c === 'purple') bg = 'bg-purple-400';
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c);
                    }}
                    className={`w-4 h-4 rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer ${bg} ${
                      selectedColor === c ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 font-bold scale-105' : ''
                    }`}
                  />
                );
              })}
            </div>
            
            <div className="w-px h-4 bg-slate-700" />
            
            <button
              type="button"
              onClick={() => {
                setNewHighlightText(selectionRange.text);
                setNewHighlightNote('');
                setNewBasisText('');
                setEditingHighlight(null);
                setShowAnnotationCreator(true);
              }}
              className="text-white hover:text-amber-400 font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Annotate</span>
            </button>
            
            <button
              type="button"
              onClick={() => {
                const newH: DocumentHighlight = {
                  id: `hl-${Date.now()}`,
                  text: selectionRange.text,
                  type: 'note',
                  label: 'Personal Note',
                  note: '',
                  color: selectedColor,
                  createdAt: new Date().toISOString()
                };
                const updatedDoc: WorkspaceDocument = {
                  ...doc,
                  highlights: [...(doc.highlights || []), newH]
                };
                onUpdateDoc(updatedDoc);
                setSelectionRange(null);
                toast.success("Text highlighted!", { icon: '✨' });
              }}
              className="text-white/80 hover:text-white font-medium hover:underline transition cursor-pointer text-[11px]"
            >
              Highlight
            </button>
            
            <button
              type="button"
              onClick={() => setSelectionRange(null)}
              className="p-1 rounded hover:bg-slate-800 text-white/60 hover:text-white cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* ANNOTATION CREATOR MODAL OVERLAY */}
        {showAnnotationCreator && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-[#FCFAF6] border border-stone-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden font-sans text-xs">
              <div className="border-b border-stone-200/80 px-5 py-4 bg-white flex justify-between items-center">
                <h3 className="font-serif text-sm font-semibold text-stone-850">
                  {editingHighlight ? "Edit Annotation Insight" : "Create Legal Annotation"}
                </h3>
                <button 
                  type="button"
                  onClick={() => {
                    setShowAnnotationCreator(false);
                    setEditingHighlight(null);
                  }}
                  className="text-stone-450 hover:text-stone-700 font-bold transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Highlighted Excerpt</span>
                  <div className="p-3 bg-stone-50 border border-stone-200/65 rounded-lg text-stone-700 italic max-h-32 overflow-y-auto leading-relaxed font-serif text-[12.5px] select-text text-left">
                    "{editingHighlight ? editingHighlight.text : newHighlightText}"
                  </div>
                </div>
                
                <div className="space-y-1.5 flex flex-col text-left">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Notes & Comments</span>
                  <textarea
                    value={newHighlightNote}
                    onChange={e => setNewHighlightNote(e.target.value)}
                    placeholder="Provide legal context, key precedents or questions to address..."
                    className="w-full h-20 p-3 bg-white border border-stone-200 rounded-lg focus:ring-1 focus:ring-[#866337] focus:border-[#866337] focus:outline-none transition text-stone-800 font-sans text-[12px] leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 flex flex-col text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#866337] uppercase tracking-wider">Key Basis Phrase or Sentence</span>
                    <span className="text-[9px] text-stone-400">Must match text within the excerpt</span>
                  </div>
                  <input
                    type="text"
                    value={newBasisText}
                    onChange={e => setNewBasisText(e.target.value)}
                    placeholder="Type words inside excerpt directly used as basis..."
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg focus:ring-1 focus:ring-[#866337] focus:border-[#866337] focus:outline-none transition text-stone-800 font-sans text-[12px] leading-relaxed"
                  />
                  {newBasisText && !(editingHighlight ? editingHighlight.text : newHighlightText).toLowerCase().includes(newBasisText.toLowerCase().trim()) && (
                    <p className="text-[10px] text-amber-600 font-semibold italic mt-0.5">
                      ⚠️ Phrase not found exactly inside the highlighted excerpt.
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-stone-100 pt-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#866337] uppercase tracking-wider mr-1">Marker Color:</span>
                    {(['amber', 'blue', 'emerald', 'purple'] as const).map(c => {
                      let bg = 'bg-amber-400';
                      let label = 'Amber';
                      if (c === 'blue') { bg = 'bg-blue-400'; label = 'Blue'; }
                      if (c === 'emerald') { bg = 'bg-emerald-450'; label = 'Emerald'; }
                      if (c === 'purple') { bg = 'bg-purple-100'; label = 'Purple'; }
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          title={label}
                          className={`w-5 h-5 rounded-full transition hover:scale-105 cursor-pointer ${bg} ${
                            selectedColor === c ? 'ring-2 ring-[#866337] ring-offset-1' : ''
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="border-t border-stone-200/80 px-5 py-3.5 bg-stone-50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowAnnotationCreator(false);
                    setEditingHighlight(null);
                  }}
                  className="px-3.5 py-1.5 text-[11px] font-semibold text-stone-550 hover:text-stone-750 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (editingHighlight) {
                      // Adjust existing
                      const updatedH = {
                        ...editingHighlight,
                        note: newHighlightNote,
                        basisText: newBasisText,
                        color: selectedColor
                      };
                      const updatedDoc = {
                        ...doc,
                        highlights: doc.highlights.map((h: any) => h.id === editingHighlight.id ? updatedH : h)
                      };
                      onUpdateDoc(updatedDoc);
                      toast.success("Annotation updated!");
                    } else {
                      // Create new
                      const newH: DocumentHighlight = {
                        id: `hl-${Date.now()}`,
                        text: newHighlightText,
                        type: 'note',
                        label: 'Personal Note',
                        note: newHighlightNote,
                        basisText: newBasisText,
                        color: selectedColor,
                        createdAt: new Date().toISOString()
                      };
                      const updatedDoc: WorkspaceDocument = {
                        ...doc,
                        highlights: [...(doc.highlights || []), newH]
                      };
                      onUpdateDoc(updatedDoc);
                      toast.success("Annotation saved!");
                    }
                    setShowAnnotationCreator(false);
                    setEditingHighlight(null);
                    setSelectionRange(null);
                  }}
                  className="px-4 py-1.5 bg-[#866337] hover:bg-[#5a4223] text-white rounded-lg text-[11px] font-semibold transition shadow-3xs cursor-pointer flex items-center gap-1 hover:shadow active:scale-95 duration-200"
                >
                  Save Annotation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className={`${isReadingMode ? (isReadingModeChatOpen ? 'w-2/3' : 'w-full') : 'w-1/2'} flex flex-col bg-[#EEEDEB] overflow-hidden transition-all duration-300`} id="lex-doc-panel">
      
      {/* SOLID CHROME/ACROBAT TABS CONTAINER WITH FINE VISUOUS BORDERS */}
      <div className="flex bg-[#EEEDEB] border-b border-slate-300 items-end justify-between h-[44px] px-4 select-none shrink-0" id="doc-tabs-bar">
        <div className="flex items-end gap-1 overflow-x-auto h-full pr-4 flex-1">
          {openTabs.map((tabId) => {
            const tabDoc = allDocs.find((d) => d.id === tabId);
            const isReviewListTab = tabId === 'review-list-dashboard';
            const isKnowledgeBaseTab = tabId === 'knowledge-base-dashboard';
            const isTodoListTab = tabId === 'todo-list';
            const isTimerTab = tabId === 'timer';
            const isMemoryTab = tabId === 'memory-vault';
            const tabTitle = isReviewListTab 
              ? 'Saved Items' 
              : isKnowledgeBaseTab
              ? 'Knowledge Base'
              : isTodoListTab 
              ? 'Todo List' 
              : isTimerTab
              ? 'Focus Timer'
              : isMemoryTab
              ? 'Memory Vault'
              : tabDoc?.tag || 'Reference';

            // Set a realistic visual tab format
            const formattedTitle = tabDoc && tabDoc.title.toLowerCase().endsWith('.pdf') 
              ? tabDoc.title 
              : tabDoc && tabDoc.category === 'Reference'
              ? `${tabDoc.title}.pdf`
              : tabTitle;

            const isActive = activeTabId === tabId;

            return (
              <div
                key={tabId}
                onClick={() => setActiveTabId(tabId)}
                id={`tab-${tabId}`}
                className={`flex items-center gap-2 px-3.5 h-[34px] text-[11.5px] font-sans font-medium transition-all shrink-0 rounded-t-lg border-x border-t cursor-pointer ${
                  isActive
                    ? 'bg-[#EEEDEB] translate-y-[1px] py-1 border-[#D1D5DB] border-b-transparent text-slate-900 font-bold bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.04)]'
                    : 'bg-[#E4E2DF]/85 py-1 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {/* Acrobat Document/PDF Icon pairing */}
                {(isReviewListTab || isKnowledgeBaseTab || isTodoListTab || isTimerTab || isMemoryTab || tabDoc) && (
                  <FileText className={`w-3.5 h-3.5 mr-0.5 shrink-0 ${tabDoc?.category === 'Reference' || tabDoc?.title.toLowerCase().includes('.pdf') ? 'text-red-500' : 'text-[#866337]'}`} />
                )}
                <span className="max-w-[150px] truncate">{formattedTitle}</span>
                {pinnedTabs.includes(tabId) && (
                  <Pin className="w-2.5 h-2.5 text-[#866337] fill-current" />
                )}
                {openTabs.length > 1 && !pinnedTabs.includes(tabId) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tabId);
                    }}
                    className="p-1 ml-1 rounded-full hover:bg-slate-205/60 text-slate-400 hover:text-slate-700 transition"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED PREMIUM PDF ACTION BAR */}
      {activeDoc && (
        <div className="bg-[#FAF9F5] border-b border-slate-200/80 px-6 py-2.5 flex items-center shrink-0 min-h-11 text-xs select-none shadow-[0_1px_1px_rgba(0,0,0,0.01)] z-20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => {
                  setShowAboutPanel(!showAboutPanel);
                }} 
                className={`px-3.5 py-1.5 bg-white border rounded-md flex items-center gap-2 font-medium transition cursor-pointer select-none active:scale-[0.97] duration-150 ${
                  showAboutPanel ? 'border-[#866337] text-[#866337] bg-stone-50/50 ring-1 ring-[#866337]/10' : 'border-[#E5E7EB] text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-3xs'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>About Document</span>
              </button>

              <button 
                onClick={handleDownloadFile} 
                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-[#E5E7EB] flex items-center gap-2 rounded-md shadow-3xs cursor-pointer select-none font-medium transition active:scale-[0.97] duration-150"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Download</span>
              </button>

              <button 
                onClick={() => window.print()} 
                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-[#E5E7EB] flex items-center gap-2 rounded-md shadow-3xs cursor-pointer select-none font-medium transition active:scale-[0.97] duration-150"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>
            </div>

            {/* Premium, clean Reading Mode Button */}
            <div className="flex items-center gap-2">
              {isReadingMode && (
                <button 
                  type="button"
                  onClick={onToggleReadingModeChat} 
                  className={`px-3.5 py-1.5 border rounded-md flex items-center gap-2 font-medium transition cursor-pointer select-none active:scale-[0.97] duration-150 ${
                    isReadingModeChatOpen 
                      ? 'border-[#866337] text-[#866337] bg-[#E8E4DA]/40 ring-1 ring-[#866337]/10' 
                      : 'bg-white border-[#E5E7EB] text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-3xs'
                  }`}
                  title={isReadingModeChatOpen ? "Hide Reading Assistant" : "Show Reading Assistant"}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isReadingModeChatOpen ? 'text-[#866337]' : 'text-slate-400'}`} />
                  <span>{isReadingModeChatOpen ? 'Hide Assistant' : 'Ask Assistant'}</span>
                </button>
              )}

              <button 
                type="button"
                onClick={onToggleReadingMode} 
                className={`px-3.5 py-1.5 border rounded-md flex items-center gap-2 font-medium transition cursor-pointer select-none active:scale-[0.97] duration-150 ${
                  isReadingMode 
                    ? 'border-[#866337] text-[#866337] bg-[#E8E4DA]/40 ring-1 ring-[#866337]/10' 
                    : 'bg-white border-[#E5E7EB] text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-3xs'
                }`}
              >
                {isReadingMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-[#866337]" />
                    <span>Exit Reading Mode</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reading Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW AREA */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        <AnimatePresence mode="wait">
          {activeTabId === 'timer' ? (
            /* EMBEDDED STUDY TIMER CONSOLE */
            <motion.div 
              key="timer-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col bg-[#FCFAF6] overflow-hidden" 
              id="study-timer-console-panel"
            >
              <StudyTimer />
            </motion.div>
          ) : activeTabId === 'todo-list' ? (
            /* CLAUDE STYLED TODO LIST PANEL */
            <motion.div 
              key="todo-list-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center bg-[#FAF9F6]" 
              id="todo-list-dashboard-view"
            >
              <div className="w-full max-w-2xl space-y-8 text-left">
                {/* Header */}
                <div className="space-y-3 pb-6 border-b border-stone-200/70 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#D97757]/10 flex flex-col items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 text-[#D97757]" strokeWidth={2} />
                  </div>
                  <h2 className="font-serif font-medium text-3xl text-stone-800 tracking-tight" id="todo-list-title">
                    Tasks
                  </h2>
                  <p className="text-stone-500 font-sans text-[13px] leading-relaxed max-w-md text-center">
                    Organize your thoughts and track upcoming milestones.
                  </p>
                </div>

                {/* Interactive Add Section */}
                <form onSubmit={handleAddTodoSubmit} className="relative" id="todo-add-form">
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    className="w-full font-sans text-[14px] bg-white border border-stone-200/80 focus:border-[#D97757]/50 focus:ring-4 focus:ring-[#D97757]/10 rounded-xl pl-4 pr-12 py-3 text-stone-800 placeholder-stone-400 focus:outline-none transition-all shadow-sm"
                    id="todo-input-field"
                  />
                  <button
                    type="submit"
                    disabled={!newTodoText.trim()}
                    className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center bg-[#D97757] hover:bg-[#C56546] disabled:bg-stone-100 disabled:text-stone-300 text-white rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed"
                    id="todo-add-btn"
                  >
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </form>

                {/* Todo List Rows */}
                <div className="space-y-3 pt-2">
                  {todos.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-stone-200/80 rounded-xl bg-white/50" id="todo-empty-state">
                      <p className="text-[13px] text-stone-400 font-sans">No tasks currently. Type above to add one.</p>
                    </div>
                  ) : (
                    <div className="space-y-3" id="todo-items-list">
                      {todos.map((todo) => (
                        <div
                          key={todo.id}
                          className={`group flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                            todo.completed 
                              ? 'bg-stone-50/30 border-transparent opacity-60' 
                              : 'bg-white border-stone-200/60 hover:border-stone-300 shadow-sm hover:shadow'
                          }`}
                          id={`todo-row-${todo.id}`}
                        >
                          <button
                            type="button"
                            onClick={() => onToggleTodo(todo.id)}
                            className={`mt-0.5 w-[18px] h-[18px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                              todo.completed
                                ? 'bg-stone-300 border-stone-300 text-white'
                                : 'border-stone-300 hover:border-[#D97757] text-transparent hover:text-[#D97757]/20 relative before:content-[""] before:absolute before:inset-1 before:rounded-full before:bg-current'
                            }`}
                            id={`todo-box-${todo.id}`}
                          >
                            {todo.completed && <CheckCircle className="w-full h-full text-white" strokeWidth={2.5} />}
                          </button>

                          <div className="min-w-0 flex-1 flex flex-col text-left pt-[1px]">
                            <p className={`text-[13px] font-sans transition-all leading-relaxed ${
                              todo.completed 
                                ? 'line-through text-stone-500' 
                                : 'text-stone-800'
                            }`}>
                              {todo.text}
                            </p>
                            <span className="text-[10px] font-sans text-stone-400 mt-1">
                              {todo.createdAt}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onDeleteTodo(todo.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 -mr-2 -mt-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition duration-200 cursor-pointer"
                            title="Remove task"
                            id={`todo-del-${todo.id}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Footer */}
                {todos.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-2 pt-6 border-t border-stone-200/80" id="todo-controls-footer">
                    <p className="text-[13px] font-sans text-stone-400">
                      <span className="text-stone-700 font-medium">{todos.filter(t => !t.completed).length}</span> pending tasks
                    </p>
                    <div className="flex items-center gap-4 text-[13px] font-sans">
                      <button
                        type="button"
                        onClick={onClearCompletedTodos}
                        className="text-stone-500 hover:text-stone-800 transition cursor-pointer"
                      >
                        Clear Completed
                      </button>
                      <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                      <button
                        type="button"
                        onClick={() => onResetTodos([])}
                        className="text-red-500/80 hover:text-red-600 transition cursor-pointer"
                      >
                        Empty List
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : activeTabId === 'review-list-dashboard' ? (
            
            /* PERSONAL SYLLABUS DIRECTORY PORTFOLIO */
            <motion.div 
              key="dashboard-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-[#FAF9F6] text-left" 
              id="review-list-dashboard-view"
            >
              <div className="space-y-1.5 pb-4 border-b border-slate-200/60">
                <h3 className="font-display font-medium text-lg text-slate-950">
                  Item Index
                </h3>
                <p className="text-slate-500 font-serif italic text-xs leading-relaxed max-w-xl">
                  A simple directory tracking items marked for review.
                </p>
              </div>

              <div className="space-y-4">
                {readingList.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500 font-serif italic">Your saved index is empty</p>
                  </div>
                ) : (
                  <div className="border border-stone-200/60 rounded-md bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse" id="reading-list-grid">
                      <thead>
                        <tr className="border-b border-stone-200/60 bg-stone-50/50">
                          <th className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono font-medium text-stone-500 w-12">Type</th>
                          <th className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono font-medium text-stone-500">File Name</th>
                          <th className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono font-medium text-stone-500 w-32">Status</th>
                          <th className="px-3 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {readingList.map((item) => {
                          const correlatedDoc = allDocs.find(d => d.id === item.docId);

                          return (
                            <tr
                              key={item.id}
                              onClick={() => onOpenTab(item.docId)}
                              id={`list-row-${item.docId}`}
                              className="group hover:bg-stone-50 transition-colors duration-200 cursor-pointer"
                            >
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-[10px] font-mono text-stone-400 font-semibold px-2 py-1 bg-stone-50 rounded">
                                  {correlatedDoc?.category || 'REF'}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex flex-col">
                                  <span className="font-sans font-medium text-[13px] text-stone-800 tracking-tight">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-400 mt-0.5">
                                    {item.tag}
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => onToggleStatus(item.docId)}
                                  className={`text-[10px] font-mono tracking-wider font-semibold transition px-2 py-1 rounded w-full text-center ${
                                    item.status === 'Archived' 
                                      ? 'bg-stone-100/50 text-stone-400' 
                                      : item.status === 'In Progress' 
                                        ? 'bg-amber-50 text-amber-600' 
                                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                                  }`}
                                >
                                  {item.status === 'Archived' ? 'ARCHIVED' : item.status === 'In Progress' ? 'PROGRESS' : 'PENDING'}
                                </button>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => onRemoveFromReadingList(item.docId)}
                                  className="p-1.5 rounded-md text-stone-300 hover:text-red-500 hover:bg-red-50 transition duration-200 opacity-0 group-hover:opacity-100"
                                  title="Remove from list"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>

          ) : activeTabId === 'knowledge-base-dashboard' ? (
            
            <motion.div 
              key="knowledge-base-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-[#FAF9F6] text-left"
              id="knowledge-base-view"
            >
              <div className="space-y-1.5 pb-4 border-b border-slate-200/60">
                <h3 className="font-display font-medium text-lg text-slate-950">
                  Knowledge Base & RAG Desk
                </h3>
                <p className="text-slate-500 font-serif italic text-xs leading-relaxed max-w-xl">
                  A centralized directory of all ingested statutory codes, codals, and landmark Philippine Supreme Court decisions.
                </p>
              </div>

              {/* Philippine Jurisprudence & Grounding Desk */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs text-left" id="ph-law-grounding-hub">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-[#866337]/10 text-[#866337] inline-block">
                        <Globe className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#866337] font-bold">
                        National RAG Grounding Desk
                      </span>
                    </div>
                    <h4 className="font-sans text-slate-900 font-bold text-sm">
                      Philippine Jurisprudence & Statutory Filtering
                    </h4>
                    <p className="text-xs text-slate-650 font-sans max-w-xl leading-relaxed">
                      All queries are formatted and weighted against <strong>Lawphil (lawphil.net)</strong> dockets and <strong>sc.judiciary.gov.ph</strong> rulings. Click any shortcut below to load optimized research parameters immediately:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:self-start">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 text-[10px] font-sans font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Lawphil Connected
                    </span>
                    <span className="bg-amber-100/60 text-amber-900 border border-amber-200/50 text-[10px] font-mono px-2.5 py-1 rounded-full shrink-0">
                      G.R. No. Filtered
                    </span>
                  </div>
                </div>

                {/* Quick RAG Query Shortcuts */}
                <div className="mt-5 pt-4 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    className="bg-white border border-stone-200 p-3.5 rounded-lg hover:border-[#866337]/40 hover:shadow-xs transition cursor-pointer"
                    onClick={() => {
                      if (window.dispatchEvent) {
                        const event = new CustomEvent("set-chat-input", { detail: "Search Lawphil for elements of self defense under Article 11(1) of the Revised Penal Code Philippines" });
                        window.dispatchEvent(event);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between text-[#866337]">
                      <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Penal RPC Search</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-1">Lawphil: RPC self-defense elements</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Source: Art. 11, RPC Justifying</p>
                  </div>

                  <div 
                    className="bg-white border border-stone-200 p-3.5 rounded-lg hover:border-[#866337]/40 hover:shadow-xs transition cursor-pointer"
                    onClick={() => {
                      if (window.dispatchEvent) {
                        const event = new CustomEvent("set-chat-input", { detail: "Search Supreme Court PH for landmark cases on substantive and procedural due process under Article III Section 1" });
                        window.dispatchEvent(event);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between text-[#866337]">
                      <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Constitutional Search</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-1">Supreme Court: Due Process Clause</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Source: Art III, Sec 1 Due Process</p>
                  </div>

                  <div 
                    className="bg-white border border-stone-200 p-3.5 rounded-lg hover:border-[#866337]/40 hover:shadow-xs transition cursor-pointer"
                    onClick={() => {
                      if (window.dispatchEvent) {
                        const event = new CustomEvent("set-chat-input", { detail: "Search Lawphil for Serrano v. Gallant Maritime Services G.R. No. 167614 OFWs Backwages" });
                        window.dispatchEvent(event);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between text-[#866337]">
                      <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Labor Jurisdiction</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-1">Serrano v. Gallant Maritime OFW</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Source: G.R. No. 167614, Backwages</p>
                  </div>
                </div>
              </div>

              {/* Sub-tabs for Ingested Documents directory */}
              {allDocs.length > 0 && (
                <div className="flex border-b border-slate-200/80 gap-5 pb-0.5" id="kb-sub-tabs-bar">
                  <button
                    type="button"
                    onClick={() => setKbTab('active')}
                    className={`pb-2 text-xs font-sans font-bold tracking-wider uppercase transition-all relative border-b-2 cursor-pointer ${
                      kbTab === 'active' 
                        ? 'text-[#866337] border-[#866337]' 
                        : 'text-slate-400 hover:text-slate-600 border-transparent'
                    }`}
                    id="kb-active-tab-btn"
                  >
                    Active ({allDocs.filter(d => !d.isArchived).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setKbTab('archived')}
                    className={`pb-2 text-xs font-sans font-bold tracking-wider uppercase transition-all relative border-b-2 cursor-pointer ${
                      kbTab === 'archived' 
                        ? 'text-[#866337] border-[#866337]' 
                        : 'text-slate-400 hover:text-slate-600 border-transparent'
                    }`}
                    id="kb-archived-tab-btn"
                  >
                    Archived ({allDocs.filter(d => !!d.isArchived).length})
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {allDocs.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500 font-serif italic">Your knowledge base is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3" id="knowledge-base-grid">
                    {allDocs
                      .filter((doc) => kbTab === 'active' ? !doc.isArchived : !!doc.isArchived)
                      .map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => {
                            onOpenTab(doc.id);
                          }}
                          className="group flex flex-col p-4 rounded-lg border bg-white border-stone-200 hover:border-slate-300 shadow-sm hover:shadow transition-all duration-300 cursor-pointer text-left"
                          id={`kb-doc-card-${doc.id}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 pr-6 flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-[#866337] uppercase tracking-wider font-semibold">
                                  {doc.category || 'REF'}
                                </span>
                                <span className="h-0.5 w-0.5 rounded-full bg-stone-300" />
                                <span className="text-[10px] font-mono font-bold text-stone-400">
                                  {doc.tag}
                                </span>
                                {doc.isArchived && (
                                  <>
                                    <span className="h-0.5 w-0.5 rounded-full bg-stone-300" />
                                    <span className="text-[9px] font-sans font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded uppercase">
                                      Archived
                                    </span>
                                  </>
                                )}
                              </div>
                              <h5 className="font-sans font-medium text-sm text-stone-850 transition duration-150">
                                {doc.title}
                              </h5>
                              {doc.subtitle && (
                                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                                  {doc.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center shrink-0 gap-1.5" onClick={e => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => {
                                  const nextState = !doc.isArchived;
                                  onUpdateDoc({ ...doc, isArchived: nextState });
                                  toast.success(nextState ? 'Document archived' : 'Document restored to Active Workspace');
                                }}
                                className={`p-1.5 rounded-md transition duration-200 hover:bg-slate-50 ${
                                  doc.isArchived ? 'text-[#866337]' : 'text-slate-400 hover:text-[#866337]'
                                }`}
                                title={doc.isArchived ? "Restore to Active workspace" : "Archive document"}
                                id={`kb-archive-btn-${doc.id}`}
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteDoc && onDeleteDoc(doc.id)}
                                className="p-1.5 rounded-md text-stone-300 hover:text-red-500 hover:bg-red-50 transition duration-200"
                                title="Delete Source"
                                id={`kb-delete-btn-${doc.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    {allDocs.filter((doc) => kbTab === 'active' ? !doc.isArchived : !!doc.isArchived).length === 0 && (
                      <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg bg-stone-50/50">
                        <p className="text-xs text-slate-400 font-serif italic">No {kbTab} documents found in the database.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

          ) : activeTabId === 'memory-vault' ? (
            
            /* MEMORY VAULT ARCHITECTURE PANEL */
            <motion.div 
              key="memory-vault-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-[#FAF9F6] text-stone-800 text-left"
              id="memory-vault-view"
            >
              <div className="space-y-3 pb-6 border-b border-slate-200/60 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#866337]/10 flex flex-col items-center justify-center mb-2">
                    <Database className="w-5 h-5 text-[#866337]" strokeWidth={2} />
                  </div>
                  <h2 className="font-serif font-medium text-3xl text-slate-800 tracking-tight" id="memory-vault-title">
                    Memory Architecture
                  </h2>
                  <p className="text-slate-500 font-sans text-[13px] leading-relaxed max-w-md text-center">
                    Live state of dynamic user context across persistence layers.
                  </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 max-w-2xl mx-auto h-[600px] pb-10">
                <MemoryCategoryCard 
                  title="Preferences" 
                  items={memory.preferences} 
                  onAdd={text => onUpdateMemory({ ...memory, preferences: [...memory.preferences, text] })}
                  onEdit={(i, text) => { const newPref = [...memory.preferences]; newPref[i] = text; onUpdateMemory({ ...memory, preferences: newPref }); }}
                  onDelete={i => { const newPref = memory.preferences.filter((_, idx) => idx !== i); onUpdateMemory({ ...memory, preferences: newPref }); }}
                />

                <MemoryCategoryCard 
                  title="Long-Term Memory" 
                  items={memory.longTerm} 
                  onAdd={text => onUpdateMemory({ ...memory, longTerm: [...memory.longTerm, text] })}
                  onEdit={(i, text) => { const newLt = [...memory.longTerm]; newLt[i] = text; onUpdateMemory({ ...memory, longTerm: newLt }); }}
                  onDelete={i => { const newLt = memory.longTerm.filter((_, idx) => idx !== i); onUpdateMemory({ ...memory, longTerm: newLt }); }}
                />

                <MemoryCategoryCard 
                  title="Episodic (Events)" 
                  items={memory.episodic} 
                  onAdd={text => onUpdateMemory({ ...memory, episodic: [...memory.episodic, text] })}
                  onEdit={(i, text) => { const newEp = [...memory.episodic]; newEp[i] = text; onUpdateMemory({ ...memory, episodic: newEp }); }}
                  onDelete={i => { const newEp = memory.episodic.filter((_, idx) => idx !== i); onUpdateMemory({ ...memory, episodic: newEp }); }}
                />

                <MemoryCategoryCard 
                  title="Short-Term Context" 
                  items={memory.shortTerm} 
                  onAdd={text => onUpdateMemory({ ...memory, shortTerm: [...memory.shortTerm, text] })}
                  onEdit={(i, text) => { const newSt = [...memory.shortTerm]; newSt[i] = text; onUpdateMemory({ ...memory, shortTerm: newSt }); }}
                  onDelete={i => { const newSt = memory.shortTerm.filter((_, idx) => idx !== i); onUpdateMemory({ ...memory, shortTerm: newSt }); }}
                />
              </div>
            </motion.div>

          ) : activeDoc ? (
            <motion.div 
              key={activeDoc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0"
            >
              {renderDocumentPaper(activeDoc)}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-panel"
              className="flex-1 flex flex-col justify-center items-center py-20 bg-[#EEEDEB]"
            >
              <div className="w-48 h-32 bg-white border border-[#D1D5DB] rounded-lg shadow-sm flex flex-col relative select-none mb-6">
                <div className="absolute -top-[17px] left-3 px-3 py-1 bg-white border-t border-x border-[#D1D5DB] rounded-t-lg text-[8.5px] font-mono tracking-widest text-[#866337] font-bold uppercase">
                  ACTIVE TAB
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="space-y-1.5 mt-1">
                    <div className="w-1/3 h-1.5 bg-slate-200 rounded-xs" />
                    <div className="w-2/3 h-1.5 bg-slate-100 rounded-xs" />
                    <div className="w-1/2 h-1.5 bg-slate-100/50 rounded-xs" />
                  </div>
                  <div className="text-[10px] text-[#866337] font-mono font-bold tracking-wider uppercase text-left">
                    Workspace Index
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-serif italic mb-4">Your desk is clear</p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={onCreateDoc}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-[#866337] hover:text-[#5a4223] rounded-lg text-xs font-semibold font-sans tracking-wide transition duration-150 shadow-3xs cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Blank</span>
                </button>
                
                <button
                  onClick={() => {
                    const title = prompt("Enter reference source title:");
                    if (title && onAddSource) {
                      const id = `doc-${Date.now()}`;
                      onAddSource({
                        id,
                        title,
                        tag: 'SOURCE',
                        category: 'Reference',
                        subtitle: 'Manual Entry',
                        content: '',
                        highlights: [],
                        sections: [
                          { id: `sec-${Date.now()}`, title: 'Excerpt', text: 'Added manually via ingestion interface.' }
                        ]
                      });
                    }
                  }}
                  className="px-4 py-2 bg-[#866337] hover:bg-[#5a4223] text-white rounded-lg text-xs font-semibold font-sans tracking-wide transition duration-150 shadow-3xs cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Ingest Source</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
