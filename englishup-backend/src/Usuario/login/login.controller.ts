import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('buscar')
  find(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.findOne(createLoginDto);
  }

  
}
