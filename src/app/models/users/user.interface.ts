export interface ListaUsers {
      
      id_usuario : string
      area_id: string
      perfil_id: string
      centro: string
      nombres: string
      apellidos: string
      correo_institucional: string
      correo_alternativo: string
      identificacion: string
      genero: string
      ciudad_residencia: string
}

export interface User {
    id_usuario: string
		perfil_id: string
		centro: string
		nombres: string
		apellidos: string
		correo_institucional: string
		correo_alternativo: string
		identificacion: string
		genero: string
		ciudad_residencia: string
		area_id: string
		contrasena: string
}
