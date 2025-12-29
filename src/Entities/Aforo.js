class Aforo {
  constructor(data) {
    this.id = data.id;
    this.fecha = data.fecha;
    this.hora = data.hora;
    this.tipo_aforo = data.tipo_aforo;
    this.zona_ruta_id = data.zona_ruta_id;

    this.total_volumen_m3 = parseFloat(data.total_volumen_m3 || 0);
    this.total_peso_kg = parseFloat(data.total_peso_kg || 0);

    this.observaciones = data.observaciones;
    this.nombre_aforador = data.nombre_aforador;
    this.usuario_id = data.usuario_id;

    this.fecha_creacion = data.fecha_creacion;
  }
}

export default Aforo;
