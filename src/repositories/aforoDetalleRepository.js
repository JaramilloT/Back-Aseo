import db from "../config/database.js";
import AforoDetalle from "../Entities/AforoDetalle.js";

class AforoDetalleRepository {

  async findAllByAforo(aforoId) {
    const [rows] = await db.query(
      "SELECT * FROM aforo_detalles WHERE aforo_id = ?",
      [aforoId]
    );
    return rows.map(r => new AforoDetalle(r));
  }

  async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM aforo_detalles WHERE id = ?",
      [id]
    );
    return rows.length ? new AforoDetalle(rows[0]) : null;
  }

  async create(data) {
    const sql = `
      INSERT INTO aforo_detalles
      (aforo_id, empaque_id, cantidad_empaques, volumen_calculado, fecha_creacion)
      VALUES (?,?,?,?,NOW())
    `;

    const values = [
      data.aforo_id,
      data.empaque_id,
      data.cantidad_empaques || 0,
      data.volumen_calculado || 0
    ];

    const [result] = await db.query(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const sql = `
      UPDATE aforo_detalles SET
      empaque_id=?,
      cantidad_empaques=?,
      volumen_calculado=?
      WHERE id=?
    `;

    const values = [
      data.empaque_id,
      data.cantidad_empaques || 0,
      data.volumen_calculado || 0,
      id
    ];

    await db.query(sql, values);
    return this.findById(id);
  }

  async delete(id) {
    await db.query("DELETE FROM aforo_detalles WHERE id = ?", [id]);
    return true;
  }

  async sumTotalVolumenByAforo(aforoId) {
    const [rows] = await db.query(
      `SELECT COALESCE(SUM(volumen_calculado),0) AS total_volumen
      FROM aforo_detalles
      WHERE aforo_id = ?`,
      [aforoId]
    );
    return rows[0]?.total_volumen || 0;
  }
}

export default new AforoDetalleRepository();
