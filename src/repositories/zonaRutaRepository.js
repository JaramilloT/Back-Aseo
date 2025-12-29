import db from '../config/database.js';
import ZonaRuta from '../Entities/ZonaRuta.js';

class ZonaRutaRepository {

  async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM zonas_rutas WHERE activo = 1 ORDER BY nombre_zona'
    );
    return rows.map(r => new ZonaRuta(r));
  }

  async findAllColores() {
    const [rows] = await db.query(
      'SELECT DISTINCT color_ruta FROM zonas_rutas WHERE activo = 1 ORDER BY color_ruta'
    );
    return rows.map(r => r.color_ruta);
  }

  async findByColorRuta(color) {
    const [rows] = await db.query(
      'SELECT * FROM zonas_rutas WHERE color_ruta = ? AND activo = 1 ORDER BY nombre_zona',
      [color]
    );
    return rows.map(r => new ZonaRuta(r));
  }

  async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM zonas_rutas WHERE id = ?',
      [id]
    );
    return rows[0] ? new ZonaRuta(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO zonas_rutas (nombre_zona, color_ruta, direccion) VALUES (?, ?, ?)',
      [data.nombre_zona, data.color_ruta, data.direccion || null]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE zonas_rutas SET nombre_zona = ?, color_ruta = ?, direccion = ? WHERE id = ?',
      [data.nombre_zona, data.color_ruta, data.direccion, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('UPDATE zonas_rutas SET activo = 0 WHERE id = ?', [id]);
    return true;
  }
}

export default new ZonaRutaRepository();