import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LlmProviderModule } from './llm-provider/llm-provider.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, SharedModule, CoreModule, LlmProviderModule],
})
export class AppModule {}
