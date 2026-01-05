import db from "../config/database.js";
import AforoDetalle from "../Entities/AforoDetalle.js";

class AforoDetalleRepository {

  async findAllByAforo(aforoId) {
    // ✅ AGREGADO JOIN con tipos_empaque para traer tipo_empaque
    const [rows] = await db.query(`
      SELECT 
        ad.*,
        te.tipo AS tipo_empaque,
        te.caracteristicas,
        te.capacidad_m3,
        te.peso_unitario_kg
      FROM aforo_detalles ad
      INNER JOIN tipos_empaque te ON ad.empaque_id = te.id
      WHERE ad.aforo_id = ?
      ORDER BY ad.id
    `, [aforoId]);
    
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT 
        ad.*,
        te.tipo AS tipo_empaque,
        te.caracteristicas
      FROM aforo_detalles ad
      INNER JOIN tipos_empaque te ON ad.empaque_id = te.id
      WHERE ad.id = ?
    `, [id]);
    
    return rows.length ? rows[0] : null;
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
  
  async sumTotalsByAforo(aforoId) {
    const [rows] = await db.query(
      `SELECT 
        COALESCE(SUM(volumen_calculado), 0) AS total_volumen,
        COALESCE(SUM(peso_calculado), 0) AS total_peso
      FROM aforo_detalles
      WHERE aforo_id = ?`,
      [aforoId]
    );
    return rows[0] || { total_volumen: 0, total_peso: 0 };
  }
}

export default new AforoDetalleRepository();