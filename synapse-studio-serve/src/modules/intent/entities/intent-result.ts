export interface IntentResult {
  intent: string;
  confidence: number;
  entities?: Record<string, any>;
  assistantHint?: string;
}
