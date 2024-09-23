import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import {
  LLMProviderInterface,
  QueryGeneratorResponse,
} from './llm-provider.interface';
import { ConfigService } from '@nestjs/config';

export class GPTProvider implements LLMProviderInterface {
  databaseInfo: string;

  constructor(private readonly configService: ConfigService) {}

  addDatabaseInfo(databaseInfo: string) {
    this.databaseInfo = databaseInfo;
  }

  async generateQuery(question: string): Promise<QueryGeneratorResponse> {
    const apiKey = this.configService.get('OPENAI_API_KEY');

    if (!apiKey) {
      return {
        query: '',
        success: false,
        error: 'API Key not found',
      };
    }

    const model = new OpenAI({
      temperature: 0,
      apiKey,
    });
    const promptTemplate = new PromptTemplate({
      inputVariables: ['question', 'schema'],
      template: `
      Você é um assistente especializado em bancos de dados MySQl. Sua tarefa é transformar perguntas em linguagem natural em consultas SQL.
      Baseado no seguinte esquema de banco de dados:
      
      {schema}
      
      Pergunta: {question}
      
      Gere uma consulta SQL para essa pergunta:
      `,
    });

    const prompt = await promptTemplate.format({
      question,
      schema: this.databaseInfo,
    });

    try {
      const response = await model.call(prompt);

      console.log('Consulta SQL gerada:', response);

      return {
        query: response,
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        query: '',
        success: false,
        error: 'Error generating query',
      };
    }
  }
}
