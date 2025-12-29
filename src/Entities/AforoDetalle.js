class AforoDetalle {
  constructor(data) {
    this.id = data.id;
    this.aforo_id = data.aforo_id;
    this.empaque_id = data.empaque_id;

    this.cantidad_empaques = parseInt(data.cantidad_empaques || 0);

    this.volumen_calculado = parseFloat(data.volumen_calculado || 0);
    this.peso_calculado_kg = parseFloat(data.peso_calculado_kg || 0);

    this.fecha_creacion = data.fecha_creacion;
  }
}

export default AforoDetalle;
