import { Injectable } from '@nestjs/common';
import { GPTProvider } from './gpt.provider';
import { LLMProviderInterface } from './llm-provider.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LLMProviderService {
  constructor(private readonly configService: ConfigService) {}

  async getLLMProvider(llmProvider: string): Promise<LLMProviderInterface> {
    return new GPTProvider(this.configService);
  }
}
