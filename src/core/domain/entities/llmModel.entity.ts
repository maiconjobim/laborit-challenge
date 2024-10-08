export class LLMModel {
  id: number;

  modelName: string;

  apiEndpoint: string;

  private apiKey: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor({ modelName, apiEndpoint, isActive = true }: Partial<LLMModel>) {
    this.modelName = modelName;
    this.apiEndpoint = apiEndpoint;
    this.isActive = isActive;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
