// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AiService } from './ia.service';
import { AiController } from './ia.controller';


@Module({
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
