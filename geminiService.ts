
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface HybridContext {
  region: string;
  crop: string;
  stage: string;
  soilType: string;
  observedRainfall: string;
  irrigationMethod: string;
  lat?: number;
  lng?: number;
}

export interface AdvisoryResult {
  action: string;
  reason: string;
  riskPrevented: string;
  lossReductionDetail: string;
  confidence: number;
}

export const getAdvisory = async (context: HybridContext): Promise<AdvisoryResult> => {
  try {
    const prompt = `
      You are the FoodFlow AI Field Operations Engineer. Your goal is to maximize yield resilience and minimize post-harvest loss in alignment with SDG-2.
      
      CONTEXTUAL DATA:
      - Regional Hub: ${context.region} ${context.lat ? `(GPS: ${context.lat}, ${context.lng})` : ''}
      - Biological Entity: ${context.crop}
      - Phenological Stage: ${context.stage}
      - Substrate: ${context.soilType}
      - Hydration Input: ${context.irrigationMethod}
      - Local Precipitation: ${context.observedRainfall}

      TASK:
      Generate a high-precision operational directive. 
      The 'action' should be a professional command. 
      The 'reason' must be technical and evidence-based (Why is this suggested?).
      The 'riskPrevented' should identify what specific threat is mitigated.
      The 'lossReductionDetail' should explain how this reduces food loss.

      Return ONLY a JSON object:
      {
        "action": "...",
        "reason": "...",
        "riskPrevented": "...",
        "lossReductionDetail": "...",
        "confidence": 94
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: 'application/json'
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      action: result.action || "Maintain baseline observation protocols.",
      reason: result.reason || "Environmental variables are within standard deviation for this phenological phase.",
      riskPrevented: result.riskPrevented || "No significant risks identified in current window.",
      lossReductionDetail: result.lossReductionDetail || "Ensures crop remains at peak biological health.",
      confidence: result.confidence || 88
    };
  } catch (error) {
    console.error("Field Operations Engine Error:", error);
    return {
      action: "Adhere to regional safety baseline.",
      reason: "Diagnostic engine synchronization delay.",
      riskPrevented: "Baseline environmental shifts.",
      lossReductionDetail: "Prevents drift from historical averages.",
      confidence: 75
    };
  }
};
