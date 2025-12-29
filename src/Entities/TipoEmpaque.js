class TipoEmpaque {
  constructor(data) {
    this.id = data.id;
    this.tipo = data.tipo;
    this.caracteristicas = data.caracteristicas;
    this.capacidad_m3 = parseFloat(data.capacidad_m3);
    this.peso_unitario_kg = parseFloat(data.peso_unitario_kg);
    this.activo = data.activo === 1;
  }
}

export default TipoEmpaque;
