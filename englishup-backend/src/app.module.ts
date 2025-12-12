import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './Pagina/ia/ia.module';
import { RegistroModule } from './Usuario/registro/registro.module';
import { LoginModule } from './Usuario/login/login.module';
import { ModificarModule } from './Usuario/modificar/modificar.module';


@Module({
  imports: [AiModule,RegistroModule,LoginModule,ModificarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
