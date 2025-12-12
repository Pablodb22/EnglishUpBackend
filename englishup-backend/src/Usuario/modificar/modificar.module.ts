import { Module } from '@nestjs/common';
import { ModificarService } from './modificar.service';
import { ModificarController } from './modificar.controller';

@Module({
  controllers: [ModificarController],
  providers: [ModificarService],
})
export class ModificarModule {}
