import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';


@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post('crear')
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registroService.create(createRegistroDto);
  }

}
