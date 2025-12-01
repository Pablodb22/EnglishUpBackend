import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './Pagina/ia/ia.module';
import { RegistroModule } from './Usuario/registro/registro.module';
import { LoginModule } from './Usuario/login/login.module';


@Module({
  imports: [AiModule,RegistroModule,LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
