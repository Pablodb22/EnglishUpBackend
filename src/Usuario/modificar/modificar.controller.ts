import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModificarService } from './modificar.service';
import { CreateModificarDto } from './dto/create-modificar.dto';
import { CreateModificarNivelDto } from './dto/create-modificarnivel.dto';




@Controller('modificar')
export class ModificarController {
  constructor(private readonly modificarService: ModificarService) {}

  @Post('usuario')
  modify(@Body() createModificarDto: CreateModificarDto) {
    return this.modificarService.modify(createModificarDto);
  }

  @Post('nivel')
  modifyNivel(@Body() createNivelDto: CreateModificarNivelDto) {
    return this.modificarService.modifyNivel(createNivelDto);
  }
}
