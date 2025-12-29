class ZonaRuta {
  constructor(data) {
    this.id = data.id;
    this.nombre_zona = data.nombre_zona;
    this.color_ruta = data.color_ruta;
    this.direccion = data.direccion;
    this.activo = data.activo !== undefined ? data.activo : true;
    this.fecha_creacion = data.fecha_creacion;
  }

  toSummary() {
    return {
      id: this.id,
      nombre: this.nombre_zona,
      color: this.color_ruta
    };
  }

  isActive() {
    return this.activo === true || this.activo === 1;
  }
}

export default ZonaRuta;
