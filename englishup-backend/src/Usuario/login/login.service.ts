import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

@Injectable()
export class LoginService {
 
  public supabaseServer = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  )

async findOne(createLoginDto: CreateLoginDto) {
   
  const { data: userData, error: userError } = await this.supabaseServer
    .from('usuarios')
    .select('*') 
    .eq('correo', createLoginDto.correo)
    .single(); 

  if (userError && userError.code !== 'PGRST116') { 
    return { ok: false, message: userError.message };
  }
  
  if (!userData) {
    return { ok: false, message: 'Usuario no encontrado' };
  }

  try {
    const contrasenaValida = await bcrypt.compare(
      createLoginDto.contrasena, 
      userData.password_hash
    );

    if (!contrasenaValida) {
      return { ok: false, message: 'Contraseña incorrecta' };
    }
    const usuario = {nombre_completo: userData.nombre_completo, correo: userData.correo,  nivel: userData.nivel, fecha_creacion: userData.fecha_creacion};
    
    return { ok: true, data: usuario };

  } catch (compareError) {    
    console.error("Error al comparar contraseñas:", compareError);
    return { ok: false, message: 'Error en la verificación de credenciales.' };
  }
}


}
