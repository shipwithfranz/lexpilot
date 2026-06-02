import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API route first to keep keys hidden
  app.post("/api/tag", async (req, res) => {
    try {
      const { title, content } = req.body;
      const api_key = process.env.GEMINI_API_KEY;
      if (!api_key || api_key === "MY_GEMINI_API_KEY") {
        return res.json({ category: "Note", tag: "UNTITLED" });
      }
      
      const ai = new GoogleGenAI({
        apiKey: api_key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: `Analyze the following legal document layout. Suggest an appropriate broad 'category' (e.g., Note, Project, Case, Statute, Contract, Brief) and a specific short 'tag' (max 15 chars, uppercase, e.g., CRIM-LAW, CONSTI, CORP). \n\nTitle: ${title}\n\nContent:\n${content}` }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              tag: { type: Type.STRING }
            },
            required: ["category", "tag"]
          }
        }
      });
      
      const rawText = response.text || "{}";
      res.json(JSON.parse(rawText.trim()));
    } catch (error: any) {
      console.warn("Gemini auto-tagging error (applying default fallback category and tag):", error?.message || error);
      res.json({ category: "Document", tag: "LAW-REF" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, context, knowledgebase, memory, todos, searchWeb, selectedSubject } = req.body;

      if (message && message.trim().toLowerCase() === "open todo list") {
        res.json({
          text: `I have opened your interactive "open todo list" task planner in the right-hand panel view.\n\nYou can add, track, complete, or remove your academic milestones and legal study objectives directly in that view.`,
          sources: []
        });
        return;
      }

      if (message && message.trim().toLowerCase() === "open lawphil") {
        res.json({
          text: `I have loaded the **Lawphil Project** web platform in your right-hand research panel.\n\nYou can search Philippine statutes, constitutions, codes, and supreme court holdings directly or navigate via the helpful quick research links.`,
          sources: []
        });
        return;
      }

      if (message && message.trim().toLowerCase() === "open timer") {
        res.json({
          text: `I have activated your Study Focus Timer in the right-hand panel view. Use this clean, distraction-free Pomodoro tracker to structure your legal reading blocks and legal citation reviews.`,
          sources: []
        });
        return;
      }

      if (message && message.trim().toLowerCase() === "close timer") {
        res.json({
          text: `I have closed your Study Focus Timer panel. Feel free to re-open it at any point during your review session by asking me to "open timer".`,
          sources: []
        });
        return;
      }

      if (message && (message.trim().toLowerCase() === "close lawphil" || message.trim().toLowerCase() === "close right panel")) {
        res.json({
          text: `I have closed the **Lawphil Project** tab in your right-hand workspace panel. Let me know if you would like to load other legal reference documents or explore more statutory dockets.`,
          sources: []
        });
        return;
      }

      if (message && message.trim().toLowerCase().includes('jg summit') && message.trim().toLowerCase().includes('open')) {
        res.json({
          text: `I have opened the full text of G.R. No. 124293, JG Summit Holdings, Inc. vs. Court of Appeals in your workspace panel.\n\nYou may now ask questions, and I will ground my answers based on the text of this case.`,
          action: { type: 'OPEN_DOCUMENT', docId: 'jg-summit-124293' },
          sources: []
        });
        return;
      }

      if (message && (message.trim().toLowerCase() === "add new tasks" || message.trim().toLowerCase().startsWith("add new tasks"))) {
        res.json({
          text: `I have registered the requested objectives into your active study checklist. You can view, toggle, or add further milestones directly in the interactive "open todo list" planner in the right-hand panel view.`,
          sources: []
        });
        return;
      }

      const api_key = process.env.GEMINI_API_KEY;

      if (!api_key || api_key === "MY_GEMINI_API_KEY") {
        // High-quality simulated response indicating empty database state
        const simulatedReply = `The LexPilot legal knowledgebase is completely empty. There are no supreme court cases, statutory codals, or regulatory materials indexed in this workspace.

I am prepared to perform general legal advisory or discuss raw principles upon your instruction. Let me know what you would like to explore!`;
        const sourcesList: any[] = [];

        res.json({
          text: simulatedReply,
          sources: sourcesList
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: api_key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      let subjectInstruction = '';
      if (selectedSubject === 'labor_law') {
        subjectInstruction = `\n\nCRITICAL CONTEXT & INSTRUCTION: The user has aligned their study curriculum to LABOR LAW. You must act as an expert Filipino Labor Law professor and practitioner. Citing the Labor Code of the Philippines (especially Book VI, Article 294 for Security of Tenure, Article 297 for Just Causes, and Article 298 for Authorized Causes) is highly demanded. Provide rigorous double-barreled legal analysis (applying facts to laws explicitly), referencing Supreme Court of the Philippines Decisions (using G.R. No. and Date format).`;
      } else if (selectedSubject === 'criminal_law') {
        subjectInstruction = `\n\nCRITICAL CONTEXT & INSTRUCTION: The user has aligned their study curriculum to CRIMINAL LAW. You must act as an expert Filipino Criminal Law academic. Focus heavily on elements of felonies, justifying circumstances (Revised Penal Code Article 11, specifically Self-Defense requisites under RPC Art 11[1]), and criminal liabilities. Guide their memory of key bar examinations patterns with structured legal formulas and Supreme Court dockets from Lawphil.`;
      } else if (selectedSubject === 'constitutional_law') {
        subjectInstruction = `\n\nCRITICAL CONTEXT & INSTRUCTION: The user has aligned their study curriculum to CONSTITUTIONAL LAW. You must act as an authority on Constitutional Law, focusing on the 1987 Philippine Constitution (especially Article III: Bill of Rights). Explain deep concepts like substantive/procedural due process (Section 1), search warrants and illegal evidence admissibility (Section 2 and 3), and standards of judicial review with precise constitutional citations and landmark PH Supreme Court rulings.`;
      } else if (selectedSubject === 'civil_law') {
        subjectInstruction = `\n\nCRITICAL CONTEXT & INSTRUCTION: The user has aligned their study curriculum to CIVIL LAW (specifically Human Relations). You must act as an expert Filipino Civil Law professor. Focus heavily on abuse of rights (Article 19 of the Civil Code), general liability (Article 20), acts contrary to morals/customs (Article 21), unjust enrichment (Article 22), and respect for privacy/personality (Article 26). Frame concepts with clear, relatable scenarios and sound civil law principles.`;
      } else if (selectedSubject === 'remedial_law') {
        subjectInstruction = `\n\nCRITICAL CONTEXT & INSTRUCTION: The user has aligned their study curriculum to REMEDIAL LAW & EVIDENCE. You must act as an authoritative Philippine Remedial Law tutor, focusing on the Rules of Court (Rule 130: Rules of Admissibility). Explain concepts like the Original Document Rule (Section 3), Parol Evidence Rule (Section 10), and Hearsay Rule exceptions (Section 36, such as dying declarations, declaration against interest, or res gestae). Give rigorous analyses of admissibility of evidence.`;
      }

      const phLawRule = `\n\nPHILIPPINE LAW RAG RULE:
- You are a specialized Philippine Legal RAG system. All answers MUST be strictly aligned with Philippine jurisprudence, statutes, and statutory construction.
- Cite actual decisions of the Supreme Court of the Philippines (e.g. G.R. Nos., Promulgation dates, Title) and statutory provisions of Philippine Codes (Revised Penal Code, Labor Code, Civil Code, etc.).
- When web grounding is enabled, prioritize searching, digesting, and referencing Lawphil (lawphil.net) or the Supreme Court of the Philippines official repository (sc.judiciary.gov.ph). Keep references formal and accurate.
- Strictly avoid applying US or foreign laws unless explicitly compared or referred to by Philippine jurisprudence (such as the origins of substantive/procedural due process, or Miranda rights references).
- MANDATORY LINKING PATTERN: When citing any of the following key legal provisions or cases in your response text, you MUST format it as a clickable markdown hyperlink using the exact 'cite://' protocol so the user can click it to open the document instantly:
  * For G.R. No. 124293 (JG Summit Holdings, Inc.): [G.R. No. 124293](cite://jg-summit-124293)
  * For G.R. No. 167614 (Serrano v. Gallant Maritime): [G.R. No. 167614](cite://serrano-167614)
  * For Section 1 of the Constitution (Due Process & Equal Protection): [Article III, Section 1](cite://consti-law-bill-of-rights/consti-sec-1)
  * For Section 2 of the Constitution (Searches/Seizures): [Article III, Section 2](cite://consti-law-bill-of-rights/consti-sec-2)
  * For Section 3 of the Constitution (Privacy of Comm/Inadmissible evidence): [Article III, Section 3](cite://consti-law-bill-of-rights/consti-sec-3)
  * For Section 4 of the Constitution (Speech/Assembly): [Article III, Section 4](cite://consti-law-bill-of-rights/consti-sec-4)
  * For Article 294 of the Labor Code (Security of Tenure): [Article 294](cite://labor-law-tenure/labor-sec-security-of-tenure)
  * For Article 297 of the Labor Code (Just Causes): [Article 297](cite://labor-law-tenure/labor-sec-just-causes)
  * For Article 298 of the Labor Code (Authorized Causes): [Article 298](cite://labor-law-tenure/labor-sec-authorized-causes)
  * For Article 11(1) of the RPC (Self-Defense): [Article 11(1)](cite://criminal-law-justifying/crim-sec-self-defense)
  * For Article 11(2) of the RPC (Defense of Relatives): [Article 11(2)](cite://criminal-law-justifying/crim-sec-defense-relatives)
  * For Article 11(4) of the RPC (State of Necessity/Avoid Evil): [Article 11(4)](cite://criminal-law-justifying/crim-sec-avoid-evil)
  * For Article 19 of the Civil Code (Abuse of Rights): [Article 19](cite://civil-law-human-relations/civil-sec-abuse-of-rights)
  * For Article 20 of the Civil Code (Liability for Illegal Acts): [Article 20](cite://civil-law-human-relations/civil-sec-general-liability)
  * For Article 21 of the Civil Code (Acts Contrary to Morals): [Article 21](cite://civil-law-human-relations/civil-sec-contrary-morals)
  * For Article 22 of the Civil Code (Unjust Enrichment): [Article 22](cite://civil-law-human-relations/civil-sec-unjust-enrichment)
  * For Article 26 of the Civil Code (Privacy & Dignity): [Article 26](cite://civil-law-human-relations/civil-sec-privacy-dignity)
  * For Rule 130 Section 3 (Original Document Rule): [Rule 130, Section 3](cite://court-rules-evidence/evidence-sec-best-evidence)
  * For Rule 130 Section 10 (Parol Evidence Rule): [Rule 130, Section 10](cite://court-rules-evidence/evidence-sec-parol-evidence)
  * For Rule 130 Section 36 (Hearsay Rule): [Rule 130, Section 36](cite://court-rules-evidence/evidence-sec-hearsay)
  Always use these exact markdown links for these sources whenever mentioned, enabling high-fidelity legal RAG integration.`;

      const systemPrompt = `You are an intelligent AI assistant for LexPilot, the Philippine Law workspace and RAG hub. You assist Filipino law students, lawyers, and legal scholars in researching constitutional, criminal, civil, labor, and remedial law. You act as a helpful companion to organize the studies, track notes, and answer questions.${subjectInstruction}${phLawRule}

You have access to a structured Memory Architecture that you can read from and write to.
Current Memory State:
${memory ? JSON.stringify(memory, null, 2) : 'No memory initialized.'}

Current Action Plan (Todos):
${todos ? JSON.stringify(todos, null, 2) : 'No pending tasks.'}

If you learn new facts about the user (preferences, long-term facts, recent episodic events, or short-term context), you MUST use the "memoryUpdates" object in your response to add them to the architecture.

PRIMARY LAW REFERENCE GROUNDING DIRECTIVE:
------------------------------------------
Whenever the user asks any question or requests a list, research, analysis, or advice, you MUST first search and prioritize the provided Document Context (Active Document and wider Workspace Knowledgebase) above everything else:
1. Ground your answers directly on the statutes, sections, codals, provisions, and case excerpts contained in the provided contexts.
2. If an Active Document (the open document context) is provided: it represents what the user is currently reading. Treat it as your absolute primary search target and base your advice primarily on it!
3. If the answer is present in either the open document or the wider workspace documents, you MUST reference it in your answer and return specific source items in the 'sources' array containing correct 'docId' and 'sectionId' keys.
4. Only rely on your general internal Philippine legal knowledge if the answer cannot be found in the provided document context, or to supplement and enrich the analysis. Always indicate clearly which points correspond to the provided documents and which points correspond to general jurisprudence.

${context ? `IMPORTANT: The user currently has the following document open in their workspace panel. You MUST ground your answers in this text if the user asks questions about it. YOU MUST ALSO return sources pointing to the specific sections you used.
---
${context}
---

When citing the document, return the 'docId' (which correspond to the currently open document), the specific 'sectionId', and a concise 'label' indicating the section in the sources array.` : ''}

${knowledgebase ? `IMPORTANT: You have access to the entire knowledgebase consisting of the workspace documents below. When answering inquiries, you MUST first search this knowledgebase for relevant information. If you find relevant information, base your answer primarily on it, and include specific citations using the 'docId' and 'sectionId'. If the information is NOT present in the knowledgebase, only then should you utilize your internal weights (general knowledge) to answer the query.
---
${knowledgebase}
---
` : ''}

Explain concepts and answer questions using your general knowledge locally or fallback with concise, professional language. Format answers using markdown bolding, structured numeric/bulleted lists, and clean section breaks.

If the user asks to "draft me a plan", "create a full plan", or "checklist to be executed", you MUST generate a list of strings in the 'newTodos' array corresponding to each precise checklist or plan item. When passing 'newTodos', also write a text explanation confirming that returning you have created the plan and it will be populated in the action plan panel.
If the user asks you to execute a task from the Action Plan, provide the execution output in 'text' and include the ID of the completed task(s) in the 'completedTaskIds' array to mark them as done.

If the user asks to create a document, or asks to save the current response/query as a document, provide the document details in the 'newDocument' object within the response. The document content should be elegantly formatted with clear titles and paragraphs. Include title, subtitle, content, category, and tag. You must also write a text explanation confirming that the document has been created and will be automatically saved and opened in the right panel.

If the user asks to "open" or read a specific document, and you know it exists in the workspace, you can return an action with type "OPEN_DOCUMENT" and the corresponding docId.

Respond only with the requested JSON format matching the schema exactly. Speak conversationally and reply referencing previous details if the user continues the discussion or asks follow-up questions.`;

      let contents: any[] = [];
      if (history && Array.isArray(history) && history.length > 0) {
        contents = history.map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        }));
      } else {
        contents = [{
          role: "user",
          parts: [{ text: message }]
        }];
      }

      let response;
      let retries = 4;
      let delayMs = 1200;
      let currentModel = "gemini-3.5-flash";
      
      while (retries > 0) {
        try {
          const geminiConfig: any = {
            systemInstruction: systemPrompt,
          };

          if (searchWeb) {
            geminiConfig.tools = [{ googleSearch: {} }];
            geminiConfig.systemInstruction = systemPrompt + "\n\nCRITICAL instructions for response format:\nSince this is an online grounded query with web search tools, you MUST return your entire response as a single, valid, raw JSON object. Do NOT wrap your JSON in markdown code blocks (e.g., do not use ```json or ```). Start your response exactly with '{' and end it exactly with '}'. The JSON object MUST strictly conform to this structure:\n{\n  \"text\": \"Your pristine editorial markdown formatted response, detailing legal points elegantly (using the web search results as reference).\",\n  \"sources\": [\n    {\n       \"label\": \"Optional title of local document source if cited material\",\n       \"docId\": \"Optional ID of local document\",\n       \"sectionId\": \"Optional section ID\"\n    }\n  ],\n  \"suggestedPrompts\": [\"Short, relevant follow-up question 1\", \"Short, relevant follow-up question 2\"]\n}\nKeep your JSON formatted perfectly without syntax errors.";
          } else {
            geminiConfig.responseMimeType = "application/json";
            geminiConfig.responseSchema = {
              type: Type.OBJECT,
              properties: {
                text: {
                  type: Type.STRING,
                  description: "Your pristine editorial markdown answer here, detailing legal points elegantly."
                },
                action: {
                  description: "Optional action to perform in the UI, such as opening a document.",
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: "Type of action, e.g., 'OPEN_DOCUMENT' or 'OPEN_MEMORY_VAULT'" },
                    docId: { type: Type.STRING, description: "The ID of the document to open." }
                  }
                },
                memoryUpdates: {
                  description: "Updates to the memory architecture. Extract user facts, preferences, or episodic details.",
                  type: Type.OBJECT,
                  properties: {
                    addPreferences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "New user preferences to store." },
                    addLongTerm: { type: Type.ARRAY, items: { type: Type.STRING }, description: "New long-term memory facts." },
                    addEpisodic: { type: Type.ARRAY, items: { type: Type.STRING }, description: "New episodic memories (events/actions)." },
                    addShortTerm: { type: Type.ARRAY, items: { type: Type.STRING }, description: "New short-term context." },
                    removeItems: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exact string matches of items to remove from across any memory tier." }
                  }
                },
                sources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      docId: { type: Type.STRING },
                      sectionId: { type: Type.STRING }
                    }
                  },
                  description: "Array of sources used, if any. Provide docId and the specific sectionId if returning a source from the provided context."
                },
                suggestedPrompts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "1-3 short, relevant follow-up questions the user can ask."
                },
                newTodos: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of tasks or checklist items to be created when the user asks for a plan, draft, or checklist."
                },
                completedTaskIds: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of task IDs from the Action Plan that have just been completed or executed."
                },
                newDocument: {
                  type: Type.OBJECT,
                  description: "Details for a new document to be created in the workspace.",
                  properties: {
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    content: { type: Type.STRING },
                    category: { type: Type.STRING },
                    tag: { type: Type.STRING }
                  }
                }
              },
              required: ["text", "sources", "suggestedPrompts"]
            };
          }

          console.log(`[Gemini API] Querying model: ${currentModel}`);
          response = await ai.models.generateContent({
            model: currentModel,
            contents: contents,
            config: geminiConfig
          });
          break; // successfully fetched
        } catch (error: any) {
          console.error(`Gemini Error on ${currentModel}:`, error);
          const is429 = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED") || error?.message?.includes("quota") || error?.message?.includes("Quota");
          const is503 = error?.status === 503 || error?.message?.includes("503") || error?.message?.includes("UNAVAILABLE") || error?.status === "UNAVAILABLE" || error?.message?.includes("high demand") || error?.message?.includes("temporarily");
          
          if (is429 && currentModel === "gemini-3.5-flash") {
            console.log(`[Fallback Triggered] 429 Quota Exhausted on gemini-3.5-flash. Retrying with gemini-3.1-flash-lite...`);
            currentModel = "gemini-3.1-flash-lite";
            // Do not decrement retry count, retry right away with fallback
            continue;
          }
          
          if ((is503 || is429) && retries > 1) {
            retries--;
            console.log(`[Retry] API unavailable / throttled, retrying in ${delayMs}ms. Retries left: ${retries}`);
            await new Promise(r => setTimeout(r, delayMs));
            delayMs *= 2; // exponential backoff
          } else {
            console.warn(`[Gemini Error Recovery] Giving up on model queries. Injecting graceful fallback message.`);
            response = {
              text: JSON.stringify({
                text: `⚠️ **Workspace Assistant: High Demand / API Quota Exhausted**\n\nThe AI Assistant is currently experiencing unusually high demand or has temporarily exhausted the available API Key usage quota.\n\n### Why am I seeing this?\n1. **High API traffic**: The daily billing or free rate limits for the attached Gemini API key have been exhausted.\n2. **Recent updates**: Since you are interacting heavily with documents, large search queries can consume quotas faster.\n\n### Fully Functional Offline Features:\n- **Interactive Document Reader**: You can still browse both default law references and uploaded cases easily.\n- **Direct Workspace Search**: The document search (using input keywords) continues to highlight matches perfectly.\n- **Custom Text Highlights**: Move your mouse or use your cursor to select text and add highlights / analyses.\n- **Study Checklists**: Interactive target todo-planning list state is fully functional in the workspace.\n\n*General Jurisdiction Tip: You can try waiting 30 seconds for your rate-limit slot to reset and send your query again.*`,
                sources: [],
                suggestedPrompts: [
                  "Tell me about the 1987 Philippine Constitution layout",
                  "Security of tenure in labor code (offline search)",
                  "Show checklist tasks"
                ]
              })
            };
            break;
          }
        }
      }

      let parsedOutput;
      let rawText = response.text || "{}";

      // If the model wrapped the JSON in markdown code blocks:
      if (rawText.includes("```json")) {
        const parts = rawText.split("```json");
        if (parts.length > 1) {
          rawText = parts[1].split("```")[0];
        }
      } else if (rawText.includes("```")) {
        const parts = rawText.split("```");
        if (parts.length > 1) {
          rawText = parts[1].split("```")[0];
        }
      }

      try {
        parsedOutput = JSON.parse(rawText.trim());
      } catch (parseError) {
        const firstIndex = rawText.indexOf("{");
        const lastIndex = rawText.lastIndexOf("}");
        if (firstIndex !== -1 && lastIndex !== -1 && lastIndex > firstIndex) {
          try {
            const sliced = rawText.substring(firstIndex, lastIndex + 1);
            parsedOutput = JSON.parse(sliced);
          } catch (e) {
            console.error("Failed to parse sliced JSON:", e);
            parsedOutput = {
              text: rawText,
              sources: [],
              suggestedPrompts: []
            };
          }
        } else {
          console.error("No JSON braces found. Fallback to raw text:", rawText);
          parsedOutput = {
            text: rawText,
            sources: [],
            suggestedPrompts: []
          };
        }
      }

      // Add web grounding sources to output if Google Search was grounded
      const searchSources: any[] = [];
      const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && Array.isArray(chunks)) {
        chunks.forEach((chunk: any) => {
          if (chunk.web && chunk.web.uri) {
            searchSources.push({
              label: chunk.web.title || "Web Search Source",
              url: chunk.web.uri,
              snippet: chunk.web.title || ""
            });
          }
        });
      }

      if (searchSources.length > 0) {
        if (!parsedOutput.sources) {
          parsedOutput.sources = [];
        }
        parsedOutput.sources = [...parsedOutput.sources, ...searchSources];
      }

      res.json(parsedOutput);

    } catch (error: any) {
      console.error("Gemini server error: ", error);
      const is503 = error?.status === 503 || error?.status === 429 || error?.message?.includes("503") || error?.message?.includes("429") || error?.message?.includes("UNAVAILABLE") || error?.status === "UNAVAILABLE" || error?.message?.includes("RESOURCE_EXHAUSTED");
      if (is503) {
        res.status(503).json({ error: { code: 503, message: "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later." } });
        return;
      }
      res.status(500).json({ error: { message: "An error occurred communicating with the AI service." } });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
