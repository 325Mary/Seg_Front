export interface AssignmentI {
  id_asignacion: any;
  aprendiz_id: any;
  fecha_seguimiento_inicial: any;
  fecha_seguimiento_parcial: any;
  fecha_seguimiento_final: any;
  fecha_evaluacion_final: any;
  estado_fase_id: any;
  usuario_responsable_id: any;
  Aprendiz: any;
  // Aprendiz: {
  //   nombres:string;
  //   apellidos:string;
  // };
  estado_faseModel:any;
  User:any;
  novedad_id:any;
  tipo_novedad: any
}


export interface AssignmentI2 {
  id_asignacion: any;
  aprendiz_id: any;
  fecha_seguimiento_inicial: any;
  fecha_seguimiento_parcial: any;
  fecha_seguimiento_final: any;
  fecha_evaluacion_final: any;
  estado_fase_id: any;
  usuario_responsable_id: any;
  nombres: any;
  estado_fase:any;
  apellidos:any;
  nombre_aprendiz:string;
  apellido_aprendiz:string;
  nombre_usuario:string;
  apellido_usuario:string;
  tipo_novedad: any;
  telefono:string;
  correo_misena:string;
  correo_alternativo:string;
  ficha:string;
  seg_1:string;
  seg_2:string;
  seg_3:string;
}
export interface AssignmentNovedad{
  novedad_id: any
}

export interface PostAssignmentI {
  aprendiz_id: any;
  fecha_seguimiento_inicial: any;
  fecha_seguimiento_parcial: any;
  fecha_seguimiento_final: any;
  fecha_evaluacion_final: any;
  estado_fase_id: any;
  usuario_responsable_id: any;
  novedad_id:any;
}
