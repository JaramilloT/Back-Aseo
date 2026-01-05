import db from "../config/database.js";
import AforoRepository from "../repositories/aforoRepository.js";

class AforoService {

  async getAll(usuarioId, rol) {
    return await AforoRepository.findAll();
  }

  async getById(id) {
    const aforo = await AforoRepository.findById(id);
    if (!aforo) throw new Error("Aforo no encontrado");
    return aforo;
  }

  async create(data) {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      console.log('Creando aforo con datos:', data);

      // Insertar aforo principal
      const [res] = await conn.query(
        `INSERT INTO aforos
        (fecha, hora, tipo_aforo, zona_ruta_id, observaciones, nombre_aforador, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          data.fecha,
          data.hora,
          data.tipo_aforo,
          data.zona_ruta_id,
          data.observaciones,
          data.nombre_aforador,
          data.usuario_id
        ]
      );

      const aforoId = res.insertId;
      console.log('Aforo creado con ID:', aforoId);

      // Insertar detalles
      let totalVolumen = 0;
      let totalPeso = 0;

      for (const det of data.detalles) {
        console.log('Insertando detalle:', det);

        // Obtener información del empaque
        const [empaqueRows] = await conn.query(
          'SELECT capacidad_m3, peso_unitario_kg FROM tipos_empaque WHERE id = ?',
          [det.empaque_id]
        );

        if (empaqueRows.length === 0) {
          throw new Error(`Empaque con ID ${det.empaque_id} no encontrado`);
        }

        const empaque = empaqueRows[0];
        const volumen = det.cantidad_empaques * empaque.capacidad_m3;
        const peso = det.cantidad_empaques * empaque.peso_unitario_kg;

        totalVolumen += volumen;
        totalPeso += peso;

        await conn.query(
          `INSERT INTO aforo_detalles
          (aforo_id, empaque_id, cantidad_empaques, volumen_calculado, peso_calculado)
          VALUES (?, ?, ?, ?, ?)`,
          [aforoId, det.empaque_id, det.cantidad_empaques, volumen, peso]
        );
      }

      // Actualizar totales en el aforo
      console.log(` Actualizando totales - Volumen: ${totalVolumen}, Peso: ${totalPeso}`);
      await conn.query(
        `UPDATE aforos SET total_volumen_m3 = ?, total_peso_kg = ? WHERE id = ?`,
        [totalVolumen, totalPeso, aforoId]
      );

      await conn.commit();

      console.log('Aforo completado con éxito');

      return {
        id: aforoId,
        total_volumen_m3: totalVolumen,
        total_peso_kg: totalPeso
      };

    } catch (error) {
      await conn.rollback();
      console.error('Error en transacción:', error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async delete(id) {
    await AforoRepository.delete(id);
    return true;
  }
}
export default new AforoService();