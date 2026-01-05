import db from "../config/database.js";
import Aforo from "../Entities/Aforo.js";

class AforoRepository {

  async findAll() {
    const [rows] = await db.query(`
      SELECT
        a.id,
        a.fecha,
        a.hora,
        a.tipo_aforo,
        a.zona_ruta_id,
        a.total_volumen_m3,
        a.total_peso_kg,
        a.observaciones,
        a.nombre_aforador,
        a.nombre_usuario_testigo,
        a.usuario_id,
        a.fecha_creacion,
        a.fecha_actualizacion,
        z.nombre_zona,
        z.color_ruta,
        u.nombre AS usuario_registra
      FROM aforos a
      LEFT JOIN zonas_rutas z ON a.zona_ruta_id = z.id
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      ORDER BY a.fecha DESC, a.hora DESC
    `);
    
    console.log('Query findAll ejecutada, filas:', rows.length);
    if (rows.length > 0) {
      console.log('Primera fila:', rows[0]);
    }
    
    return rows;
  }

  async findByUsuario(usuarioId) {
    const [rows] = await db.query(
      `SELECT
        a.id,
        a.fecha,
        a.hora,
        a.tipo_aforo,
        a.zona_ruta_id,
        a.total_volumen_m3,
        a.total_peso_kg,
        a.observaciones,
        a.nombre_aforador,
        a.nombre_usuario_testigo,
        a.usuario_id,
        a.fecha_creacion,
        a.fecha_actualizacion,
        z.nombre_zona,
        z.color_ruta,
        u.nombre AS usuario_registra
      FROM aforos a
      LEFT JOIN zonas_rutas z ON a.zona_ruta_id = z.id
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.usuario_id = ?
      ORDER BY a.fecha DESC, a.hora DESC`,
      [usuarioId]
    );
    
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(
      `SELECT
        a.id,
        a.fecha,
        a.hora,
        a.tipo_aforo,
        a.zona_ruta_id,
        a.total_volumen_m3,
        a.total_peso_kg,
        a.observaciones,
        a.nombre_aforador,
        a.nombre_usuario_testigo,
        a.usuario_id,
        a.fecha_creacion,
        a.fecha_actualizacion,
        z.nombre_zona,
        z.color_ruta,
        u.nombre AS usuario_registra
      FROM aforos a
      LEFT JOIN zonas_rutas z ON a.zona_ruta_id = z.id
      LEFT JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.id = ?`,
      [id]
    );
    
    return rows.length ? rows[0] : null;
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