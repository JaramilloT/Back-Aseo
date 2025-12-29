import db from "../config/database.js";
import Aforo from "../Entities/Aforo.js";

class AforoRepository {

  async findAll() {
    const [rows] = await db.query("SELECT * FROM aforos ORDER BY fecha DESC");
    return rows.map(r => new Aforo(r));
  }

  async findByUsuario(usuarioId) {
    const [rows] = await db.query(
      "SELECT * FROM aforos WHERE usuario_id = ?",
      [usuarioId]
    );
    return rows.map(r => new Aforo(r));
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM aforos WHERE id = ?", [id]);
    return rows.length ? new Aforo(rows[0]) : null;
  }

  async create(data) {
    const [res] = await db.query(
      `INSERT INTO aforos
      (fecha, hora, tipo_aforo, zona_ruta_id, usuario_id,
      total_volumen_m3, total_peso_kg)
      VALUES (CURDATE(), CURTIME(), ?, ?, ?, 0, 0)`,
      [data.tipo_aforo, data.zona_ruta_id, data.usuario_id]
    );

    return this.findById(res.insertId);
  }

  async updateTotales(id, volumen, peso) {
    await db.query(
      `UPDATE aforos
      SET total_volumen_m3=?, total_peso_kg=?
      WHERE id=?`,
      [volumen, peso, id]
    );
  }

  async delete(id) {
    await db.query("DELETE FROM aforos WHERE id = ?", [id]);
  }
}

export default new AforoRepository();