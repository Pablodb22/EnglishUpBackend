import { Injectable } from '@nestjs/common';
import { CreateModificarDto } from './dto/create-modificar.dto';
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';


dotenv.config();
@Injectable()
export class ModificarService {

   public supabaseServer = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    )

    async modify(createModificarDto: CreateModificarDto) {
    try {
      // Agregar await y capturar la respuesta
      const { data, error } = await this.supabaseServer
        .from('usuarios')
        .update({
          nombre_completo: createModificarDto.nombre,  
          correo: createModificarDto.correo
        })
        .eq('correo', createModificarDto.correoOriginal);
           
      if (error) {
        console.log('Error al modificar perfil:', error);
        return { ok: false, message: error.message };
      }

      console.log('Perfil modificado correctamente');
      return { ok: true, message: 'Perfil modificado correctamente' };
    } catch (error) {
      console.log('Perfil no modificado, error: ', error);
      return { ok: false, message: 'Error al modificar el perfil' };
    }
  }
}