import db from "../config/database.js";
import TipoEmpaque from "../Entities/TipoEmpaque.js";

class TipoEmpaqueRepository {

  async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM tipos_empaque WHERE activo = 1 ORDER BY tipo"
    );
    return rows.map(r => new TipoEmpaque(r));
  }

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM tipos_empaque WHERE id = ?",
      [id]
    );
    return rows.length ? new TipoEmpaque(rows[0]) : null;
  }

  async create(data) {
    const sql = `
      INSERT INTO tipos_empaque
      (tipo, caracteristicas, capacidad_m3, activo, fecha_creacion)
      VALUES (?,?,?,?,NOW())
    `;

    const values = [
      data.tipo,
      data.caracteristicas || null,
      data.capacidad_m3,
      data.activo !== undefined ? (data.activo ? 1 : 0) : 1
    ];

    const [result] = await db.query(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const sets = [];
    const values = [];

    if (data.tipo !== undefined) { sets.push("tipo=?"); values.push(data.tipo); }
    if (data.caracteristicas !== undefined) { sets.push("caracteristicas=?"); values.push(data.caracteristicas); }
    if (data.capacidad_m3 !== undefined) { sets.push("capacidad_m3=?"); values.push(data.capacidad_m3); }
    if (data.activo !== undefined) { sets.push("activo=?"); values.push(data.activo ? 1 : 0); }

    if (!sets.length) return this.findById(id);

    const sql = `UPDATE tipos_empaque SET ${sets.join(", ")} WHERE id=?`;
    values.push(id);

    await db.query(sql, values);
    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM tipos_empaque WHERE id = ?", [id]);
    return true;
  }
}

export default new TipoEmpaqueRepository();
