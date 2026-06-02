import React, { useState, useEffect } from 'react';
import { StudyMode, Message, SavedItem, TodoItem, WorkspaceDocument, MemoryData, MemoryUpdates } from './types';
import ChatPanel from './components/ChatPanel';
import DocumentPanel from './components/DocumentPanel';
import Sidebar from './components/Sidebar';
import { ALL_DOCS } from './data';
import { Scale, Bookmark, Sparkles, X } from 'lucide-react';

import { Toaster, toast } from 'react-hot-toast';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [openTabs, setOpenTabs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('workspace_open_tabs');
      return saved ? JSON.parse(saved) : ['ph-constitution-1987-complete'];
    } catch {
      return ['ph-constitution-1987-complete'];
    }
  });
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('workspace_active_tab_id');
      return saved ? JSON.parse(saved) : 'ph-constitution-1987-complete';
    } catch {
      return 'ph-constitution-1987-complete';
    }
  });

  useEffect(() => {
    localStorage.setItem('workspace_open_tabs', JSON.stringify(openTabs));
  }, [openTabs]);

  useEffect(() => {
    localStorage.setItem('workspace_active_tab_id', JSON.stringify(activeTabId));
  }, [activeTabId]);
  const [pinnedTabs, setPinnedTabs] = useState<string[]>([]);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isReadingModeChatOpen, setIsReadingModeChatOpen] = useState(false);
  const [targetSearchDocs, setTargetSearchDocs] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [scrolledSectionId, setScrolledSectionId] = useState<string>('');
  
  const [selectedSubject, setSelectedSubject] = useState<'labor_law' | 'criminal_law' | 'constitutional_law' | 'civil_law' | 'remedial_law' | null>(() => {
    try {
      const saved = localStorage.getItem('workspace_selected_subject');
      return saved as 'labor_law' | 'criminal_law' | 'constitutional_law' | 'civil_law' | 'remedial_law' | null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (selectedSubject) {
      localStorage.setItem('workspace_selected_subject', selectedSubject);
    } else {
      localStorage.removeItem('workspace_selected_subject');
    }
  }, [selectedSubject]);

  const handleSubjectSelect = (subj: 'labor_law' | 'criminal_law' | 'constitutional_law' | 'civil_law' | 'remedial_law' | null) => {
    setSelectedSubject(subj);
    if (!subj) {
      setTargetSearchDocs([]);
      toast.success('Cleared curriculum alignment');
      return;
    }

    let targetDocId = '';
    if (subj === 'labor_law') {
      targetDocId = 'labor-law-tenure';
    } else if (subj === 'criminal_law') {
      targetDocId = 'criminal-law-justifying';
    } else if (subj === 'constitutional_law') {
      targetDocId = 'consti-law-bill-of-rights';
    } else if (subj === 'civil_law') {
      targetDocId = 'civil-law-human-relations';
    } else if (subj === 'remedial_law') {
      targetDocId = 'court-rules-evidence';
    }

    if (targetDocId) {
      setOpenTabs((prev) => {
        if (!prev.includes(targetDocId)) {
          return [targetDocId, ...prev];
        }
        return prev;
      });
      setActiveTabId(targetDocId);
      setTargetSearchDocs([targetDocId]);

      const subjectLabel = subj === 'labor_law' 
        ? 'Labor Law' 
        : subj === 'criminal_law' 
          ? 'Criminal Law' 
          : subj === 'constitutional_law'
            ? 'Constitutional Law'
            : subj === 'civil_law'
              ? 'Civil Law (Human Relations)'
              : 'Remedial Law (Evidence)';

      toast.success(`Curriculum aligned: ${subjectLabel}`, { icon: '⚖️' });

      setMessages((prev) => [
        ...prev,
        {
          id: `sys-subj-${Date.now()}`,
          sender: 'assistant',
          text: `Your focus is now aligned to **${subjectLabel}**. 
          
I have loaded the relevant study codal in your right panel and configured your **document grounding scope** specifically to this statute. Ask me any analytical question, request a review scenario, or draft a practice problem based on these provisions!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };
  const [searchWeb, setSearchWeb] = useState<boolean>(() => {
    try {
      return localStorage.getItem('search_web_grounding') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('search_web_grounding', String(searchWeb));
  }, [searchWeb]);

  useEffect(() => {
    if (activeTabId && !isRightPanelOpen) {
      setIsRightPanelOpen(true);
    }
  }, [activeTabId]);

  const [allDocsState, setAllDocsState] = useState<WorkspaceDocument[]>(() => {
    try {
      const saved = localStorage.getItem('workspace_docs');
      if (saved) {
        const parsed = JSON.parse(saved) as WorkspaceDocument[];
        const merged = parsed.map(d => ({ ...d, highlights: d.highlights || [] }));
        for (const doc of ALL_DOCS) {
          if (!merged.some((m) => m.id === doc.id)) {
            merged.push({ ...doc, highlights: doc.highlights || [] });
          }
        }
        return merged;
      }
      return ALL_DOCS.map(doc => ({ ...doc, highlights: doc.highlights || [] }));
    } catch {
      return ALL_DOCS.map(doc => ({ ...doc, highlights: doc.highlights || [] }));
    }
  });
  
  useEffect(() => {
    localStorage.setItem('workspace_docs', JSON.stringify(allDocsState));
  }, [allDocsState]);
  const [readingList, setReadingList] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('workspace_reading_list');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: `rl-item-${Date.now()}`,
          title: 'G.R. No. 124293: JG Summit Holdings, Inc.',
          tag: 'CONSTI-CASE',
          docId: 'jg-summit-124293',
          addedAt: 'Just Now',
          status: 'Pending'
        },
        {
          id: `rl-item-${Date.now() + 1}`,
          title: 'G.R. No. 167614: Serrano v. Gallant Maritime Services',
          tag: 'LABOR-CASE',
          docId: 'serrano-167614',
          addedAt: 'Just Now',
          status: 'In Progress'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('workspace_reading_list', JSON.stringify(readingList));
  }, [readingList]);

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem('workspace_todos');
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'Review project launch timeline', completed: false, createdAt: 'Just Now' },
        { id: '2', text: 'Analyze Q3 growth metrics', completed: false, createdAt: 'Just Now' },
        { id: '3', text: 'Draft presentation for Friday meeting', completed: true, createdAt: 'Earlier' }
      ];
    } catch {
      return [];
    }
  });

  const [memory, setMemory] = useState<MemoryData>(() => {
    try {
      const saved = localStorage.getItem('workspace_memory');
      return saved ? JSON.parse(saved) : { preferences: [], longTerm: [], episodic: [], shortTerm: [] };
    } catch {
      return { preferences: [], longTerm: [], episodic: [], shortTerm: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem('workspace_todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('workspace_memory', JSON.stringify(memory));
  }, [memory]);

  const handleToggleTodo = (id: string) => {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter(t => t.id !== id));
  };

  const handleAddTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      text,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleClearCompletedTodos = () => {
    setTodos((prev) => prev.filter(t => !t.completed));
  };

  const handleResetTodos = (newTodos: TodoItem[]) => {
    setTodos(newTodos);
  };

  const handleNewChat = () => {
    setCurrentScene(1);
    setOpenTabs([]);
    setActiveTabId('');
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Workspace initialized. You can ask any questions to begin.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stream: true
      }
    ]);
  };
 
  useEffect(() => {
    if (currentScene === 1) {
      setOpenTabs((prev) => {
        if (!prev.includes('ph-constitution-1987-complete')) {
          return ['ph-constitution-1987-complete', ...prev];
        }
        return prev;
      });
      setActiveTabId('ph-constitution-1987-complete');
      setMessages([
        {
          id: 's1-welcome',
          sender: 'assistant',
          text: `⚖️ **1987 Philippine Constitution Saved**
          
The complete **Constitution of the Republic of the Philippines (1987)** has been successfully saved and integrated as an authoritative reference in your workspace! 

All **18 Articles** and the **Preamble** are mapped with interactive, indexable sections in your side navigation panel under **CONSTI-COMPLETE**. You can:
1. **Browse granular sections** of any Article instantly.
2. **Perform deep RAG queries** against the entire constitution structure at once.
3. Use the **Basis Citation feature** to highlight specific clauses, sentences, or statutory phrases as evidence for your study notes.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else if (currentScene === 2) {
      setOpenTabs((prev) => {
        if (!prev.includes('ph-constitution-1987-complete')) {
          return ['ph-constitution-1987-complete', ...prev];
        }
        return prev;
      });
      setActiveTabId('ph-constitution-1987-complete');
      setMessages([
        {
          id: 's2-welcome',
          sender: 'assistant',
          text: `Project Track initialized. 
          
Submit inquiries or load project documents as needed.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else if (currentScene === 3) {
      setOpenTabs((prev) => {
        if (!prev.includes('review-list-dashboard')) {
          return ['review-list-dashboard', ...prev];
        }
        return prev;
      });
      setActiveTabId('review-list-dashboard');
      setMessages([
        {
          id: 's3-welcome',
          sender: 'assistant',
          text: `Personal Study syllabus initialized. Your active lists are empty.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentScene]);

  const handleSendMessage = async (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `usr-msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    const aiPlaceholderId = `ai-msg-${Date.now()}`;
    const aiPlaceholder: Message = {
      id: aiPlaceholderId,
      sender: 'assistant',
      text: "Synthesizing...",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, aiPlaceholder]);

    if (text.trim().toLowerCase() === 'open memory vault' || text.trim().toLowerCase() === 'show memory') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have opened your Memory Vault. This panel displays the long-term facts, preferences, episodic events, and short-term context I have gathered about you.`,
              stream: true
            };
          }
          return m;
        }));

        setOpenTabs((prev) => {
          if (!prev.includes('memory-vault')) {
            return [...prev, 'memory-vault'];
          }
          return prev;
        });
        setActiveTabId('memory-vault');
      }, 400);
      return;
    }

    if (text.trim().toLowerCase() === 'open todo list') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have opened your interactive "open todo list" task planner in the right-hand panel view.\n\nYou can add, track, complete, or remove your milestones and objectives directly in that view.`,
              stream: true
            };
          }
          return m;
        }));

        setOpenTabs((prev) => {
          if (!prev.includes('todo-list')) {
            return [...prev, 'todo-list'];
          }
          return prev;
        });
        setActiveTabId('todo-list');
      }, 400);
      return;
    }

    if (text.trim().toLowerCase() === 'open timer') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have activated your Focus Timer in the right-hand panel view. Use this clean, distraction-free Pomodoro tracker to structure your work blocks.`,
              stream: true
            };
          }
          return m;
        }));

        setOpenTabs((prev) => {
          if (!prev.includes('timer')) {
            return [...prev, 'timer'];
          }
          return prev;
        });
        setActiveTabId('timer');
      }, 400);
      return;
    }

    if (text.trim().toLowerCase() === 'close timer') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have closed your Study Focus Timer panel. Feel free to re-open it at any point during your review session by asking me to "open timer".`,
              stream: true
            };
          }
          return m;
        }));

        handleCloseTab('timer');
      }, 400);
      return;
    }

    const lowerText = text.trim().toLowerCase();

    if (lowerText === 'open right panel') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have opened the right panel for you.`,
              stream: true
            };
          }
          return m;
        }));
        setIsRightPanelOpen(true);
      }, 400);
      return;
    }

    if (lowerText.startsWith('go to ')) {
      let targetTabId = '';
      if (lowerText.includes('timer')) targetTabId = 'timer';
      else if (lowerText.includes('todo') || lowerText.includes('task')) targetTabId = 'todo-list';
      else if (lowerText.includes('review') || lowerText.includes('index') || lowerText.includes('item index')) targetTabId = 'review-list-dashboard';
      else if (lowerText.includes('knowledge') || lowerText.includes('base')) targetTabId = 'knowledge-base-dashboard';
      else if (lowerText.includes('memory') || lowerText.includes('vault')) targetTabId = 'memory-vault';
      else if (lowerText.includes('jg summit') || lowerText.includes('case')) targetTabId = 'jg-summit-124293';

      if (targetTabId) {
        setTimeout(() => {
          setMessages((prev) => prev.map((m) => {
            if (m.id === aiPlaceholderId) {
              return {
                ...m,
                text: `Navigating to ${targetTabId.replace(/-/g, ' ')}...`,
                stream: true
              };
            }
            return m;
          }));
          setIsRightPanelOpen(true);
          setOpenTabs((prev) => {
            if (!prev.includes(targetTabId)) {
              return [...prev, targetTabId];
            }
            return prev;
          });
          setActiveTabId(targetTabId);
        }, 400);
        return;
      }
    }

    if (lowerText === 'close right panel') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `it really closes it`,
              stream: true
            };
          }
          return m;
        }));
        setIsRightPanelOpen(false);
      }, 400);
      return;
    }

    if (lowerText === 'empty right panel') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `it empties the right panel`,
              stream: true
            };
          }
          return m;
        }));
        setPinnedTabs([]);
        setOpenTabs([]);
        setActiveTabId('');
      }, 400);
      return;
    }

    if ((lowerText.includes('jg summit') && lowerText.includes('close'))) {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have closed the G.R. No. 124293 (JG Summit Holdings, Inc.) case tab in your right-hand workspace panel. Let me know if you would like to load other legal references.`,
              stream: true
            };
          }
          return m;
        }));

        handleCloseTab('jg-summit-124293');
      }, 400);
      return;
    }

    if (lowerText === 'open jg summit' || lowerText === 'open jg summit case') {
      setTimeout(() => {
        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have opened G.R. No. 124293 (JG Summit Holdings, Inc. v. Court of Appeals) in your right-hand document panel. Let me know if you want to perform RAG analysis on national patrimony or public utilities constraints!`,
              stream: true
            };
          }
          return m;
        }));

        setIsRightPanelOpen(true);
        setOpenTabs((prev) => {
          if (!prev.includes('jg-summit-124293')) {
            return [...prev, 'jg-summit-124293'];
          }
          return prev;
        });
        setActiveTabId('jg-summit-124293');
      }, 400);
      return;
    }

    if (lowerText === 'add new tasks' || lowerText.startsWith('add new tasks:') || lowerText.startsWith('add new task')) {
      let taskText = '';
      if (lowerText.startsWith('add new tasks:')) {
        taskText = text.substring('add new tasks:'.length).trim();
      } else if (lowerText.startsWith('add new tasks ')) {
        taskText = text.substring('add new tasks'.length).trim();
      } else if (lowerText.startsWith('add new task:')) {
        taskText = text.substring('add new task:'.length).trim();
      } else if (lowerText.startsWith('add new task ')) {
        taskText = text.substring('add new task'.length).trim();
      }

      const tasksToAdd: string[] = [];
      if (taskText) {
        tasksToAdd.push(taskText);
      } else {
        tasksToAdd.push("Conduct analysis on Q3 metrics");
        tasksToAdd.push("Review product guidelines");
      }

      setTimeout(() => {
        tasksToAdd.forEach(txt => {
          const newTodo = {
            id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text: txt,
            completed: false,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setTodos((prev) => [...prev, newTodo]);
        });

        const addedText = tasksToAdd.map(t => `• **${t}**`).join('\n');

        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: `I have automatically added the following task(s) to your "open todo list":\n\n${addedText}\n\nYou can view and update them in the interactive work planner in the right-hand panel view.`,
              stream: true
            };
          }
          return m;
        }));

        setOpenTabs((prev) => {
          if (!prev.includes('todo-list')) {
            return [...prev, 'todo-list'];
          }
          return prev;
        });
        setActiveTabId('todo-list');
      }, 400);
      return;
    }

    // Extract and clean valid message history for sequential context in multi-turn chat
    const historyPayload = updatedMessages
      .filter((m) => {
        const val = m.text || '';
        if (val === 'Synthesizing...') return false;
        if (m.id === aiPlaceholderId) return false;
        return true;
      })
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

    try {
      const currentDocObj = allDocsState.find(d => d.id === activeTabId);
      const activeDocumentContext = currentDocObj ? `\n\nActive Document: ${currentDocObj.title}\nSections:\n${currentDocObj.sections.map(s => `[Section ID: ${s.id}]\n${s.title ? s.title + '\n' : ''}${s.text}`).join('\n\n')}` : '';

      const allDocsContext = allDocsState
        .filter(d => targetSearchDocs.length === 0 || targetSearchDocs.includes(d.id))
        .map(d => {
        return `Document ID: ${d.id}\nTitle: ${d.title}\nSections:\n${d.sections.map(s => `[Section ID: ${s.id}]\n${s.title ? s.title + '\n' : ''}${s.text}`).join('\n\n')}`;
      }).join('\n\n---\n\n');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyPayload, context: activeDocumentContext, knowledgebase: allDocsContext, memory, todos, searchWeb, selectedSubject })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 503 || errorData?.error?.code === 503) {
           throw new Error("503");
        }
        throw new Error(errorData?.error?.message || errorData?.error || "Server failed");
      }
      const data = await response.json();

      if (data.memoryUpdates) {
        setMemory(prev => {
          const newMem = { ...prev };
          const updates = data.memoryUpdates as MemoryUpdates;
          if (updates.addPreferences) newMem.preferences = [...newMem.preferences, ...updates.addPreferences];
          if (updates.addLongTerm) newMem.longTerm = [...newMem.longTerm, ...updates.addLongTerm];
          if (updates.addEpisodic) newMem.episodic = [...newMem.episodic, ...updates.addEpisodic];
          if (updates.addShortTerm) newMem.shortTerm = [...newMem.shortTerm, ...updates.addShortTerm];
          if (updates.removeItems && updates.removeItems.length > 0) {
             const rem = new Set(updates.removeItems);
             newMem.preferences = newMem.preferences.filter(i => !rem.has(i));
             newMem.longTerm = newMem.longTerm.filter(i => !rem.has(i));
             newMem.episodic = newMem.episodic.filter(i => !rem.has(i));
             newMem.shortTerm = newMem.shortTerm.filter(i => !rem.has(i));
          }
          return newMem;
        });
      }

      setMessages((prev) => prev.map((m) => {
        if (m.id === aiPlaceholderId) {
          return {
            ...m,
            text: data.text,
            sources: data.sources,
            suggestedPrompts: data.suggestedPrompts,
            stream: true
          };
        }
        return m;
      }));

      if (data.newTodos && data.newTodos.length > 0) {
        const newTodoItems: TodoItem[] = data.newTodos.map((text: string) => ({
          id: Math.random().toString(36).substring(2, 9),
          text: text,
          completed: false,
          createdAt: new Date().toISOString()
        }));
        
        setTodos(prev => [...prev, ...newTodoItems]);
        
        // Open the todos tab
        const todosTabId = 'todo-list';
        setOpenTabs((prev) => {
          if (!prev.includes(todosTabId)) {
            return [...prev, todosTabId];
          }
          return prev;
        });
        setActiveTabId(todosTabId);
      }

      if (data.completedTaskIds && data.completedTaskIds.length > 0) {
        setTodos(prev => prev.map(todo => 
          data.completedTaskIds.includes(todo.id) ? { ...todo, completed: true } : todo
        ));
      }

      if (data.newDocument) {
        const newDocId = `doc-new-${Date.now()}`;
        const newDoc: WorkspaceDocument = {
          id: newDocId,
          title: data.newDocument.title || 'Untitled Document',
          subtitle: data.newDocument.subtitle || '',
          category: data.newDocument.category || 'Note',
          tag: data.newDocument.tag || 'NEW',
          content: data.newDocument.content || '',
          highlights: [],
          sections: [{ id: `sec-${Date.now()}`, title: '', text: data.newDocument.content || '' }]
        };
        
        setAllDocsState(prev => [...prev, newDoc]);
        setOpenTabs((prev) => {
          if (!prev.includes(newDocId)) {
             return [...prev, newDocId];
          }
          return prev;
        });
        setActiveTabId(newDocId);
      }

      // Handle the UI action if provided by AI
      if (data.action && data.action.type === 'OPEN_DOCUMENT' && data.action.docId) {
        setOpenTabs((prev) => {
          if (!prev.includes(data.action.docId)) {
            return [...prev, data.action.docId];
          }
          return prev;
        });
        setActiveTabId(data.action.docId);
      } else if (data.action && data.action.type === 'OPEN_MEMORY_VAULT') {
        const vaultId = 'memory-vault';
        setOpenTabs((prev) => {
          if (!prev.includes(vaultId)) {
            return [...prev, vaultId];
          }
          return prev;
        });
        setActiveTabId(vaultId);
      }

      if (data.sources && data.sources.length > 0) {
        const primarySource = data.sources[0];
        if (primarySource.docId) {
          if (!openTabs.includes(primarySource.docId)) {
            setOpenTabs((prev) => [...prev, primarySource.docId]);
          }
          setActiveTabId(primarySource.docId);
          if (primarySource.sectionId) {
            setScrolledSectionId(primarySource.sectionId);
          }
        }
      }

      } catch (err: any) {
      setTimeout(() => {
        let fallbackText = "I encountered an error connecting to the service. Please try again.";
        
        if (err.message === "503") {
          fallbackText = "I'm currently experiencing high demand and need a moment to catch my breath. Spikes in demand are usually temporary. Please try again in a little bit.";
        } else if (err.message && err.message !== "Server failed" && err.message !== "Failed to fetch") {
          fallbackText = `Something went wrong: ${err.message}`;
        }

        toast.error(fallbackText);

        let fallbackSources = undefined;

        setMessages((prev) => prev.map((m) => {
          if (m.id === aiPlaceholderId) {
            return {
              ...m,
              text: fallbackText,
              sources: fallbackSources,
              stream: true
            };
          }
          return m;
        }));
      }, 700);
    }
  };

  const handleSourceClick = (docId: string, sectionId: string) => {
    if (!openTabs.includes(docId)) {
      setOpenTabs((prev) => [...prev, docId]);
    }
    setActiveTabId(docId);
    if (sectionId) {
      setScrolledSectionId(sectionId);
    }
  };

  const handleCloseTab = (id: string, force: boolean = false) => {
    if (!force && pinnedTabs.includes(id)) {
      return; // Do not close if pinned unless forced
    }

    setOpenTabs((prev) => {
      const updatedTabs = prev.filter(t => t !== id);
      setActiveTabId((currentActive) => {
        if (currentActive === id) {
          return updatedTabs.length > 0 ? updatedTabs[0] : '';
        }
        return currentActive;
      });
      return updatedTabs;
    });
  };

  const handleDeleteDoc = (id: string) => {
    setAllDocsState(prev => prev.filter(d => d.id !== id));
    handleCloseTab(id, true);
    toast.success('Document deleted successfully');
  };

  const handleAddToReadingList = (docId: string) => {
    if (readingList.some(r => r.docId === docId)) return;

    const correlatingDoc = allDocsState.find(d => d.id === docId);
    if (!correlatingDoc) return;

    const newItem: SavedItem = {
      id: `rl-item-${Date.now()}`,
      title: correlatingDoc.title,
      tag: correlatingDoc.tag,
      docId: docId,
      addedAt: 'Just Now',
      status: 'Pending'
    };

    setReadingList((prev) => [newItem, ...prev]);
    toast.success('Added to item index');
  };

  const handleRemoveFromReadingList = (docId: string) => {
    setReadingList((prev) => prev.filter(r => r.docId !== docId));
    toast.success('Removed from item index');
  };

  const handleToggleStatus = (docId: string) => {
    setReadingList((prev) => prev.map((item) => {
      if (item.docId === docId) {
        const nextStatus = item.status === 'Archived' ? 'In Progress' : item.status === 'In Progress' ? 'Pending' : 'Archived';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      const newDoc: WorkspaceDocument = {
        id: `upload-${Date.now()}`,
        title: file.name,
        subtitle: 'Uploaded File',
        category: 'Reference',
        tag: file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name,
        content: text,
        highlights: [],
        sections: [
          {
            id: `sec-${Date.now()}`,
            title: 'Uploaded Content',
            text: text
          }
        ]
      };
      
      setAllDocsState(prev => [...prev, newDoc]);
      setOpenTabs(prev => [...prev, newDoc.id]);
      setActiveTabId(newDoc.id);
      toast.success('File uploaded successfully');
    } catch (err) {
      console.error("Failed to read file", err);
      toast.error('Failed to read file');
    }
  };

  const handleCreateDoc = () => {
    const newDocId = `doc-new-${Date.now()}`;
    const newDoc: WorkspaceDocument = {
      id: newDocId,
      title: 'Untitled Document',
      subtitle: '',
      category: 'Note',
      tag: 'NEW',
      content: '',
      highlights: [],
      sections: [{ id: `sec-${Date.now()}`, title: '', text: '' }]
    };
    
    setAllDocsState(prev => [...prev, newDoc]);
    setOpenTabs((prev) => {
      if (!prev.includes(newDocId)) {
         return [...prev, newDocId];
      }
      return prev;
    });
    setActiveTabId(newDocId);
    toast.success('New document created');
  };

  return (
    <div className="flex h-screen w-screen bg-[#FAF7F2] font-sans text-slate-800 select-text overflow-hidden" id="lex-main-app">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#1E293B',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E2E8F0',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#866337',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      
      {/* EXQUISITE LEFT SIDEBAR */}
      {!isReadingMode && (
        <Sidebar
          currentScene={currentScene}
          setCurrentScene={setCurrentScene}
          allDocs={allDocsState}
          onSourceClick={(docId, sectionId) => {
            if (!openTabs.includes(docId)) {
              setOpenTabs((prev) => [...prev, docId]);
            }
            setActiveTabId(docId);
            if (sectionId) {
              setScrolledSectionId(sectionId);
            }
          }}
          readingListLength={readingList.length}
          onOpenReadingList={() => {
            if (!openTabs.includes('review-list-dashboard')) {
              setOpenTabs((prev) => ['review-list-dashboard', ...prev]);
            }
            setActiveTabId('review-list-dashboard');
          }}
          onOpenMemory={() => {
            if (!openTabs.includes('memory-vault')) {
              setOpenTabs((prev) => ['memory-vault', ...prev]);
            }
            setActiveTabId('memory-vault');
          }}
          onNewChat={handleNewChat}
          activeTabId={activeTabId}
          onFileUpload={handleFileUpload}
          onOpenKnowledgeBase={() => {
            if (!openTabs.includes('knowledge-base-dashboard')) {
              setOpenTabs((prev) => ['knowledge-base-dashboard', ...prev]);
            }
            setActiveTabId('knowledge-base-dashboard');
          }}
          onCreateDoc={handleCreateDoc}
          targetSearchDocs={targetSearchDocs}
          setTargetSearchDocs={setTargetSearchDocs}
        />
      )}

      {/* RIGHT WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden" id="main-right-workspace">
        
        {/* MINIMALIST UTTER RESTRAINT LIGHT HEADER */}
        {!isReadingMode && (
          <header className="bg-[#FCFAF6] border-b border-slate-200/60 px-8 py-5 shrink-0 flex items-center justify-between z-30" id="main-header">
            
            {/* Elegant typography pairing */}
            <div className="flex items-center gap-4">
              <span className="font-sans font-semibold text-slate-950 text-base tracking-tight flex items-center gap-2">
                Workspace
                <span className="h-1 w-1 rounded-full bg-gold-accent" />
              </span>
              <div className="h-4 w-px bg-slate-200" />
              <p className="text-[11px] text-slate-500 font-sans tracking-wide hidden md:block">
                LexPilot Legal Study Lounge
              </p>
            </div>



            {/* Minimal Docket button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (!openTabs.includes('review-list-dashboard')) {
                    setOpenTabs((prev) => ['review-list-dashboard', ...prev]);
                  }
                  setActiveTabId('review-list-dashboard');
                }}
                className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
              >
                <Bookmark className="w-3.5 h-3.5 text-gold-accent group-hover:text-gold-dark transition" />
                <span className="text-[11px] font-sans font-semibold text-slate-500 group-hover:text-slate-800">
                  Item Index ({readingList.length})
                </span>
              </button>
            </div>
          </header>
        )}

        {/* WORKSPACE PANELS CONTAINER */}
        <div className="flex-1 flex min-w-0 overflow-hidden" id="dual-panels-container">
          
          {/* LEFT COMPANION INQUIRY PANEL */}
          {!isReadingMode && (
            <ChatPanel
              isFullWidth={!isRightPanelOpen}
              currentScene={currentScene}
              messages={messages}
              onSendMessage={handleSendMessage}
              onSourceClick={handleSourceClick}
              targetSearchDocs={targetSearchDocs}
              setTargetSearchDocs={setTargetSearchDocs}
              allDocs={allDocsState}
              onTriggerAddToReadingList={handleAddToReadingList}
              onOpenReadingList={() => {
                if (!openTabs.includes('review-list-dashboard')) {
                  setOpenTabs((prev) => ['review-list-dashboard', ...prev]);
                }
                setActiveTabId('review-list-dashboard');
              }}
              searchWeb={searchWeb}
              setSearchWeb={setSearchWeb}
            />
          )}          {/* RIGHT LAW REFERENCE DOCUMENTATION */}
          {isRightPanelOpen && (
            <DocumentPanel
              isReadingMode={isReadingMode}
              isReadingModeChatOpen={isReadingModeChatOpen}
              onToggleReadingMode={() => {
                const newVal = !isReadingMode;
                setIsReadingMode(newVal);
                if (!newVal) {
                  setIsReadingModeChatOpen(false);
                }
              }}
              onToggleReadingModeChat={() => setIsReadingModeChatOpen(!isReadingModeChatOpen)}
              openTabs={openTabs}
              pinnedTabs={pinnedTabs}
              onTogglePinTab={(id) => {
                setPinnedTabs(prev => 
                  prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
                );
              }}
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
              onCloseTab={(id) => handleCloseTab(id, true)}
              onDeleteDoc={handleDeleteDoc}
              allDocs={allDocsState}
              readingList={readingList}
              onToggleStatus={handleToggleStatus}
              onRemoveFromReadingList={handleRemoveFromReadingList}
              scrolledSectionId={scrolledSectionId}
              setScrolledSectionId={setScrolledSectionId}
              targetSearchDocs={targetSearchDocs}
              setTargetSearchDocs={setTargetSearchDocs}
              onOpenReadingList={() => {
                if (!openTabs.includes('review-list-dashboard')) {
                  setOpenTabs((prev) => ['review-list-dashboard', ...prev]);
                }
                setActiveTabId('review-list-dashboard');
              }}
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
              onAddTodo={handleAddTodo}
              onClearCompletedTodos={handleClearCompletedTodos}
              onResetTodos={handleResetTodos}
              memory={memory}
              onUpdateDoc={(updatedDoc) => {
                setAllDocsState(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
              }}
              onOpenTab={(id) => {
                if (!openTabs.includes(id)) {
                  setOpenTabs(prev => [...prev, id]);
                }
                setActiveTabId(id);
              }}
              onAddSource={(newDoc) => {
                setAllDocsState(prev => [...prev, newDoc]);
                setOpenTabs((prev) => [...prev, newDoc.id]);
                setActiveTabId(newDoc.id);
              }}
              onCreateDoc={handleCreateDoc}
            />
          )}

          {/* COMPANION INQUIRY PANEL (On the right, only in Reading Mode when toggled open) */}
          {isReadingMode && isReadingModeChatOpen && (
            <div className="w-1/3 flex flex-col border-l border-slate-200/60 bg-[#FCFAF6] overflow-hidden shadow-2xl relative z-40 transition-all duration-350" id="reading-mode-companion-chat">
              {/* Premium, polished header for the Reading Mode Chat Assistant */}
              <div className="px-5 py-4 border-b border-slate-200/60 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-xs text-slate-800 tracking-wide uppercase">
                    Reading Assistant
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#866337] animate-pulse" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsReadingModeChatOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-105 transition"
                  title="Collapse chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0 flex flex-col">
                <ChatPanel
                  isFullWidth={true}
                  hideHeader={true}
                  currentScene={currentScene}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onSourceClick={handleSourceClick}
                  targetSearchDocs={targetSearchDocs}
                  setTargetSearchDocs={setTargetSearchDocs}
                  allDocs={allDocsState}
                  onTriggerAddToReadingList={handleAddToReadingList}
                  onOpenReadingList={() => {
                    if (!openTabs.includes('review-list-dashboard')) {
                      setOpenTabs((prev) => ['review-list-dashboard', ...prev]);
                    }
                    setActiveTabId('review-list-dashboard');
                  }}
                  searchWeb={searchWeb}
                  setSearchWeb={setSearchWeb}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
