export interface QueryGeneratorResponse {
  query: string;
  success: boolean;
  error?: string;
}

export interface LLMProviderInterface {
  generateQuery(question: string): Promise<QueryGeneratorResponse>;
  addDatabaseInfo(databaseInfo: string): void;
}
