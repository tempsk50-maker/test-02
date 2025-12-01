import { GoogleGenAI, Type } from "@google/genai";

export const processNewsText = async (text: string, mode: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = mode === 'quote' 
     ? "Extract quote, speaker, designation in Bengali. JSON: {headline, body, caption}" 
     : "Write catchy Bengali headline, short body, and detailed caption. JSON: {headline, body, caption}";
     
  const res = await ai.models.generateContent({
     model: "gemini-2.5-flash",
     contents: text + "\n\n" + prompt,
     config: { 
        responseMimeType: "application/json", 
        responseSchema: { 
           type: Type.OBJECT, 
           properties: { 
              headline: {type:Type.STRING}, 
              body: {type:Type.STRING}, 
              caption: {type:Type.STRING} 
           } 
        } 
     }
  });
  return JSON.parse(res.text || "{}");
};

export const processTextTool = async (text: string, tool: string) => {
   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
   const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Perform task '${tool}' on: ${text}. Return JSON with mainContent.`,
      config: { responseMimeType: "application/json" }
   });
   return JSON.parse(res.text || "{}");
};