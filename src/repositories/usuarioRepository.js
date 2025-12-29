import db from "../config/database.js";
import Usuario from "../Entities/Usuario.js";

class UsuarioRepository {

  async findAll() {
    const [rows] = await db.query(
      "SELECT id, nombre, email, rol, activo, fecha_creacion, fecha_actualizacion FROM usuarios ORDER BY id"
    );
    return rows.map(r => new Usuario(r));
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows.length ? new Usuario(rows[0]) : null;
  }

  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows.length ? new Usuario(rows[0]) : null;
  }

  async create(data) {
    const sql = `INSERT INTO usuarios (nombre, email, password, rol, activo, fecha_creacion)
                VALUES (?,?,?,?,?, NOW())`;
    const values = [
      data.nombre,
      data.email,
      data.password,
      data.rol || "aseo",
      data.activo ? 1 : 0
    ];
    const [result] = await db.query(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const sets = [];
    const values = [];

    if (data.nombre !== undefined) { sets.push("nombre=?"); values.push(data.nombre); }
    if (data.email !== undefined) { sets.push("email=?"); values.push(data.email); }
    if (data.password !== undefined) { sets.push("password=?"); values.push(data.password); }
    if (data.rol !== undefined) { sets.push("rol=?"); values.push(data.rol); }
    if (data.activo !== undefined) { sets.push("activo=?"); values.push(data.activo ? 1 : 0); }

    if (sets.length === 0) return this.findById(id);

    const sql = `UPDATE usuarios SET ${sets.join(", ")}, fecha_actualizacion = NOW() WHERE id = ?`;
    values.push(id);
    await db.query(sql, values);
    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return true;
  }

}

export default new UsuarioRepository();
