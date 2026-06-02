import React, { useState } from 'react';
import { WorkspaceDocument } from '../types';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  BookOpen, 
  FileText,
  Search,
  Database,
  Bookmark,
  CheckSquare,
  Square,
  FilePlus,
  Upload,
  MessageSquare,
  FolderOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SidebarProps {
  currentScene: number;
  setCurrentScene: (scene: number) => void;
  allDocs: WorkspaceDocument[];
  onSourceClick: (docId: string, sectionId: string) => void;
  readingListLength: number;
  onOpenReadingList: () => void;
  onOpenMemory: () => void;
  onNewChat: () => void;
  activeTabId: string;
  onFileUpload: (file: File) => void;
  onOpenKnowledgeBase: () => void;
  onCreateDoc?: () => void;
  targetSearchDocs?: string[];
  setTargetSearchDocs?: (ids: string[]) => void;
}

export default function Sidebar({
  currentScene,
  setCurrentScene,
  allDocs,
  onSourceClick,
  readingListLength,
  onOpenReadingList,
  onOpenMemory,
  onNewChat,
  activeTabId,
  onFileUpload,
  onOpenKnowledgeBase,
  onCreateDoc,
  targetSearchDocs = [],
  setTargetSearchDocs
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [sidebarFilter, setSidebarFilter] = useState<string>('');
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Simplified and high-end conversation channels 
  const tracks = [
    { id: 1, label: '⚖️ Philippine Legal RAG' },
    { id: 2, label: '📖 Codal Syllabi Study' },
    { id: 3, label: '🏛️ SC PH & Lawphil Desk' }
  ];

  const activeDocs = allDocs.filter(doc => !doc.isArchived);

  const filteredDocs = activeDocs.filter(doc => {
    return (
      doc.title.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
      doc.tag.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
      doc.category.toLowerCase().includes(sidebarFilter.toLowerCase())
    );
  });

  return (
    <div 
      onDragOver={(e) => {
        e.preventDefault();
        if (!collapsed) setIsDraggingOver(true);
      }}
      onDragLeave={() => {
        setIsDraggingOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          onFileUpload(e.dataTransfer.files[0]);
        }
      }}
      className={`h-screen bg-[#FDFCFB] text-[#191919] border-r border-[#EFEBE4] flex flex-col justify-between shrink-0 transition-all duration-300 select-none relative ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      id="lex-sidebar"
    >
      {/* Visual drag and drop frictionless dropzone overlay */}
      {isDraggingOver && (
        <div className="absolute inset-x-2 inset-y-2 bg-[#866337]/95 text-white backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-50 rounded-xl transition-all border border-dashed border-[#EBE4D5]/30 shadow-lg">
          <Upload className="w-8 h-8 mb-2 animate-bounce stroke-[1.5]" />
          <p className="font-serif text-sm font-semibold tracking-wide">Drop file to index</p>
          <p className="text-[10px] opacity-80 mt-1 font-sans">Accepts Text, PDFs, Markdown</p>
        </div>
      )}
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col min-h-0 flex-1">
        
        {/* Brand Header */}
        <div className={`px-4 py-4 flex items-center shrink-0 bg-[#FCDFCB]/0 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-sm text-[#191919] tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#866337]" />
                Workspace
              </span>
              <span className="text-[9px] bg-[#EDE8DF] px-1.5 py-0.5 text-[#5F4B32] rounded font-sans font-medium tracking-wider">
                PRO v1.1
              </span>
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md bg-transparent text-slate-400 hover:text-slate-900 transition cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Button: Start New Inquiry */}
        <div className="px-3 pb-2 shrink-0">
          {collapsed ? (
            <button 
              onClick={onNewChat}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white hover:bg-[#FAF8F5] text-[#191919] border border-[#EDE8DF] shadow-3xs transition duration-150 cursor-pointer mx-auto"
              title="Start brand new inquiry"
            >
              <Plus className="w-4 h-4 text-[#866337]" />
            </button>
          ) : (
            <button 
              onClick={onNewChat}
              className="w-full py-1.5 px-3 flex items-center justify-between rounded-lg bg-white hover:bg-[#FAF8F5] text-[#191919] border border-[#EDE8DF] shadow-3xs text-[11.5px] font-sans font-semibold tracking-wide transition active:scale-[0.98] duration-150 cursor-pointer"
            >
              <span className="text-slate-700">New Inquiry</span>
              <div className="p-0.5 bg-[#FAF6EE] rounded">
                <Plus className="w-3 h-3 text-[#866337] stroke-[3]" />
              </div>
            </button>
          )}
        </div>

        {/* COMPACT FILTER & SEARCH */}
        {!collapsed && (
          <div className="px-3 pb-3 shrink-0 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3 h-3 text-slate-400" />
              <input 
                type="text"
                placeholder="Search resources & notes..."
                value={sidebarFilter}
                onChange={(e) => setSidebarFilter(e.target.value)}
                className="w-full bg-[#FAF9F6] text-[11px] text-slate-800 placeholder-slate-400 border border-[#EDE8DF] rounded-lg pl-7 pr-3 py-1.5 focus:outline-none focus:border-[#C29B68] focus:bg-white focus:ring-1 focus:ring-[#C29B68]/15 transition-all font-sans"
              />
            </div>

            {/* Inline Quick Action Buttons */}
            <div className="flex gap-1.5">
              <button
                onClick={() => onCreateDoc && onCreateDoc()}
                className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#FAF9F6] hover:bg-white hover:border-[#C29B68]/30 border border-[#EDE8DF] text-[9.5px] text-slate-600 font-sans font-semibold transition cursor-pointer"
                title="Create a new draft note"
              >
                <Plus className="w-2.5 h-2.5 text-[#866337] stroke-[3]" />
                New Note
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-[#FAF9F6] hover:bg-white hover:border-[#C29B68]/30 border border-[#EDE8DF] text-[9.5px] text-slate-600 font-sans font-semibold transition cursor-pointer"
                title="Upload local files (Text, Markdown, PDFs)"
              >
                <Upload className="w-2.5 h-2.5 text-[#866337] stroke-[3]" />
                Import Doc
              </button>
            </div>
          </div>
        )}

        {/* MIDDLE SECTION - SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 scroll-smooth">
          
          {/* PRIMARY HUB MODULES (Grouped neatly at the top for premium layout) */}
          <div className="space-y-0.5">
            {!collapsed && (
              <span className="px-2.5 text-[9px] font-sans font-bold uppercase tracking-wider text-[#A59F95] block mb-1">
                Workspace Hubs
              </span>
            )}
            
            <button
              onClick={onOpenKnowledgeBase}
              className={`w-full flex items-center ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-1.5'} rounded-lg text-left transition duration-150 cursor-pointer text-xs ${
                activeTabId === 'knowledge-base-dashboard'
                  ? 'bg-[#EFECE6]/70 text-[#191919] font-medium shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3ECE2]/30'
              }`}
              title="Open Knowledge Base"
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0 text-[#866337]">
                <FolderOpen className="w-3.5 h-3.5" />
              </div>
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-[11.5px] text-slate-800">Knowledge Base</span>
                  <span className="text-[9px] font-mono bg-white px-1 py-0.2 rounded border border-[#EDE8DF] text-[#866337] font-semibold">
                    {activeDocs.length}
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={onOpenReadingList}
              className={`w-full flex items-center ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-1.5'} rounded-lg text-left transition duration-150 cursor-pointer text-xs ${
                activeTabId === 'review-list-dashboard'
                  ? 'bg-[#EFECE6]/70 text-[#191919] font-medium shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3ECE2]/30'
              }`}
              title="Open Saved Items"
            >
              <Bookmark className={`w-3.5 h-3.5 shrink-0 ${activeTabId === 'review-list-dashboard' ? 'text-[#866337]' : 'text-slate-400'}`} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-[11.5px] text-slate-800">Saved Items</span>
                  {readingListLength > 0 && (
                    <span className="text-[9px] font-mono bg-white px-1 py-0.2 rounded border border-[#EDE8DF] text-[#866337] font-semibold">
                      {readingListLength}
                    </span>
                  )}
                </div>
              )}
            </button>

            <button
              onClick={onOpenMemory}
              className={`w-full flex items-center ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-1.5'} rounded-lg text-left transition duration-150 cursor-pointer text-xs ${
                activeTabId === 'memory-vault'
                  ? 'bg-[#EFECE6]/70 text-[#191919] font-medium shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3ECE2]/30'
              }`}
              title="Memory Vault"
            >
              <Database className={`w-3.5 h-3.5 shrink-0 ${activeTabId === 'memory-vault' ? 'text-[#866337]' : 'text-slate-400'}`} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-[11.5px] text-slate-800">Memory Vault</span>
                </div>
              )}
            </button>

            <button
              onClick={() => onSourceClick('todo-list', '')}
              className={`w-full flex items-center ${collapsed ? 'justify-center py-2' : 'gap-2.5 px-2.5 py-1.5'} rounded-lg text-left transition duration-150 cursor-pointer text-xs ${
                activeTabId === 'todo-list'
                  ? 'bg-[#EFECE6]/70 text-[#191919] font-medium shadow-3xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3ECE2]/30'
              }`}
              title="Action Plan"
            >
              <CheckSquare className={`w-3.5 h-3.5 shrink-0 ${activeTabId === 'todo-list' ? 'text-[#866337]' : 'text-slate-400'}`} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="text-[11.5px] text-slate-800">Action Plan</span>
                </div>
              )}
            </button>
          </div>

          {/* ACTIVE CHAT THREADS (Single Line, extremely pristine) */}
          <div className="space-y-0.5">
            {!collapsed && (
              <span className="px-2.5 text-[9px] font-sans font-bold uppercase tracking-wider text-[#A59F95] block mb-1">
                Advisory Threads
              </span>
            )}
            <div className="space-y-0.5">
              {tracks.map((track) => {
                const isActive = currentScene === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setCurrentScene(track.id)}
                    className={`w-full flex items-center ${collapsed ? 'justify-center py-1.5' : 'gap-2.5 px-2.5 py-1.5'} rounded-lg text-left transition duration-150 cursor-pointer text-xs ${
                      isActive 
                        ? 'bg-[#EFECE6]/70 text-[#191919] font-medium shadow-3xs' 
                        : 'text-slate-600 hover:text-[#191919] hover:bg-[#F3ECE2]/30'
                    }`}
                    title={collapsed ? track.label : undefined}
                  >
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#866337]' : 'text-slate-400'}`} />
                    {!collapsed && (
                      <span className={`font-sans text-[11.5px] truncate ${isActive ? 'text-slate-950 font-semibold' : 'text-slate-700'}`}>
                        {track.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* INDEXED SOURCES (Completely border-free by default for premium cleanliness) */}
          <div className="space-y-0.5">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".txt,.md,.pdf,.csv"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileUpload(e.target.files[0]);
                  e.target.value = ''; // Reset input
                }
              }}
            />
            {!collapsed && (
              <div className="px-2.5 flex items-center justify-between text-[9px] font-sans font-bold uppercase tracking-wider text-[#A59F95] mb-1">
                <span>Indexed Sources</span>
                <div className="flex items-center gap-1">
                  {allDocs.length > 0 && <span className="font-mono text-[#866337] text-[8.5px] bg-[#FAF6EE] px-1 py-0.2 rounded font-bold">{activeDocs.length} Total</span>}
                  <button 
                    onClick={() => onCreateDoc && onCreateDoc()}
                    className="p-1 text-[#866337] hover:bg-[#FAF6EE] rounded transition cursor-pointer"
                    title="Create Empty Document"
                  >
                    <FilePlus className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1 text-[#866337] hover:bg-[#FAF6EE] rounded transition cursor-pointer"
                    title="Upload Source File"
                  >
                    <Upload className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-0.5" id="sidebar-indexed-sources-list">
              {filteredDocs.map((doc) => {
                const isActiveTab = activeTabId === doc.id;
                const isSelectedRef = targetSearchDocs.includes(doc.id);

                if (collapsed) {
                  return (
                    <div className="relative flex justify-center py-1 mt-0.5" key={doc.id}>
                      <button
                        onClick={() => onSourceClick(doc.id, '')}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer relative ${
                          isSelectedRef 
                            ? 'bg-[#FAF6EE] text-amber-700'
                            : isActiveTab 
                              ? 'bg-[#EFECE6] text-[#191919]' 
                              : 'text-slate-600 hover:text-[#191919] hover:bg-[#F3ECE2]/40'
                        }`}
                        title={`${doc.tag}: ${doc.title}${isSelectedRef ? ' (Active Reference)' : ''}`}
                      >
                        <BookOpen className={`w-3.5 h-3.5 ${isSelectedRef ? 'text-amber-600 stroke-[2.5]' : 'text-[#C29B68]'}`} />
                        {isSelectedRef && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500 ring-1 ring-white" />
                        )}
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={doc.id}
                    className={`group relative w-full flex items-center justify-between rounded-lg transition duration-150 text-xs px-2.5 py-1 ${
                      isSelectedRef 
                        ? 'bg-[#FAF6EE] text-[#191919]'
                        : isActiveTab 
                          ? 'bg-[#EFECE6] text-[#191919]' 
                          : 'text-slate-600 hover:text-[#191919] hover:bg-[#F3ECE2]/25'
                    }`}
                  >
                    <button
                      onClick={() => onSourceClick(doc.id, '')}
                      className="flex items-center gap-2 truncate text-left flex-1 min-w-0 cursor-pointer py-1"
                      title={`${doc.tag}: ${doc.title}`}
                    >
                      <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isSelectedRef ? 'text-amber-600 stroke-[2]' : 'text-[#C29B68] group-hover:text-[#866337]'}`} />
                      <div className="truncate min-w-0">
                        <p className={`font-sans text-[11.5px] ${isActiveTab || isSelectedRef ? 'text-slate-950 font-semibold' : 'text-slate-700 font-medium'} truncate leading-tight flex items-center gap-1.5`}>
                          <span className="truncate">{doc.tag}</span>
                          {isSelectedRef && (
                            <span className="text-[8px] px-1 bg-amber-500/10 text-amber-800 rounded font-sans tracking-normal font-bold">
                              REF
                            </span>
                          )}
                        </p>
                        <p className="text-[9.5px] text-slate-400 font-sans truncate leading-none mt-0.5 font-light pr-1">
                          {doc.title}
                        </p>
                      </div>
                    </button>

                    {setTargetSearchDocs && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSelectedRef) {
                            setTargetSearchDocs(targetSearchDocs.filter(id => id !== doc.id));
                            toast.success(`Removed ${doc.tag} from active chat references`, { id: `ref-${doc.id}` });
                          } else {
                            setTargetSearchDocs([...targetSearchDocs, doc.id]);
                            toast.success(`Set ${doc.tag} as active chat reference`, { id: `ref-${doc.id}` });
                          }
                        }}
                        className={`p-1 rounded transition cursor-pointer shrink-0 ml-1 ${
                          isSelectedRef
                            ? 'text-amber-600 opacity-100 bg-white/60'
                            : 'text-slate-300 opacity-0 group-hover:opacity-100 hover:text-amber-700 hover:bg-slate-50'
                        }`}
                        title={isSelectedRef ? "Remove from search references" : "Add to search references"}
                      >
                        {isSelectedRef ? (
                          <CheckSquare className="w-3.5 h-3.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
              {filteredDocs.length === 0 && !collapsed && (
                <div className="mx-2.5 my-1 px-3 py-3 rounded-lg bg-[#FAF9F6] border border-dashed border-[#EDE8DF] text-center">
                  <p className="text-[10px] text-slate-400 font-serif italic">
                    No documents found
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER USER BLOCK */}
      <div className="p-3 border-t border-[#EFEBE4] bg-[#FDFCFB]/50 shrink-0">
        {collapsed ? (
          <div 
            className="w-8 h-8 rounded-full bg-[#5F4B32] text-[#F9F7F3] flex items-center justify-center font-bold font-sans text-[11px] shadow-3xs cursor-help mx-auto"
            title="gabrielrevilla2020@gmail.com&#10;Pro Account"
          >
            GR
          </div>
        ) : (
          <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-[#FAF9F6] border border-[#EDE8DF] shadow-3xs">
            <div className="w-8 h-8 rounded bg-[#5F4B32] text-[#F9F7F3] flex items-center justify-center font-bold font-serif text-[11.5px] shrink-0 select-none">
              GR
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-sans font-semibold text-[#191919] truncate leading-tight">
                Gabriel Revilla
              </p>
              <p className="text-[9px] font-sans text-slate-500 truncate leading-none">
                Pro Account
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
