class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.email = data.email;
    this.password = data.password;
    this.rol = data.rol; // 'aseo' | 'administrativa'
    this.activo = data.activo !== undefined ? data.activo : true;
    this.fecha_creacion = data.fecha_creacion;
    this.fecha_actualizacion = data.fecha_actualizacion;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }

  isAdmin() {
    return this.rol === 'administrativa';
  }

  isActive() {
    return this.activo === true;
  }
}

export default Usuario;