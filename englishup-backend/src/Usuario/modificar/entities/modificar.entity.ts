import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity("usuarios")
export class Modificar {
    @PrimaryGeneratedColumn("uuid")    
    id: string;

    @Column("nombre_completo")
    nombre: string;

    @Column({unique: true})
    correo:string;

    @Column("password_hash")
    contrasena:string;

    fecha_creacion:string;

    @Column("nivel")
    nivel:string;

}
