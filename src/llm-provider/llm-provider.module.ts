import { Module } from '@nestjs/common';
import { LLMProviderService } from './llm-proviser.service';

@Module({
    providers: [LLMProviderService],
    exports: [LLMProviderService],
})
export class LlmProviderModule {}
