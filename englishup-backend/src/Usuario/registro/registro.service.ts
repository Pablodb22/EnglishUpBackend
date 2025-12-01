import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

@Injectable()
export class RegistroService {

  public supabaseServer = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  )

  create(createRegistroDto: CreateRegistroDto) {
    
    const contrasenaHash = bcrypt.hashSync(createRegistroDto.contrasena, 10);

    return this.supabaseServer.from('usuarios').insert([
      {
        nombre_completo: createRegistroDto.nombre,
        correo: createRegistroDto.correo,
        password_hash: contrasenaHash,
        fecha_creacion: createRegistroDto.fecha_creacion
      }
    ]).then(({ error, data }) => {
      if (error) {        
        return { ok: false, message: error.message };
      }
      return { ok: true, data };
    });
  }


}
