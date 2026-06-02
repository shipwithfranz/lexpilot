export type StudyMode = 'focus' | 'review';

export interface DocumentHighlight {
  id: string;
  text: string;
  type: 'note' | 'quote' | 'summary' | 'reference';
  label: string;
  note?: string;
  color: 'amber' | 'blue' | 'emerald' | 'purple';
  createdAt?: string;
  basisText?: string;
}

export interface WorkspaceDocument {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  content: string;
  highlights: DocumentHighlight[];
  sections: {
    id: string;
    title: string;
    text: string;
    highlightId?: string;
  }[];
  isArchived?: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  stream?: boolean;
  sources?: {
    label: string;
    docId?: string;
    sectionId?: string;
    url?: string;
    snippet?: string;
  }[];
}

export interface SavedItem {
  id: string;
  title: string;
  tag: string;
  docId: string;
  addedAt: string;
  status: 'Pending' | 'In Progress' | 'Archived';
}

export interface MemoryData {
  preferences: string[];
  longTerm: string[];
  episodic: string[];
  shortTerm: string[];
}

export interface MemoryUpdates {
  addPreferences?: string[];
  addLongTerm?: string[];
  addEpisodic?: string[];
  addShortTerm?: string[];
  removeItems?: string[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

