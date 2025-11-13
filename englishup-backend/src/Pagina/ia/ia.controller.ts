import { Body, Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ia.service';


@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('questions')
  async getQuestions(@Query('nivel') nivel: string) {
    const questions = await this.aiService.generateQuestions(nivel);
    return questions;
  }

  @Get('words')
  async getWords(@Query('tipo') tipo: string) {
    const questions = await this.aiService.generateWordsByTopic(tipo);
    return questions;
  }

 
}
