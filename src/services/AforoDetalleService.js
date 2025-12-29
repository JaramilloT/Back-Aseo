import AforoDetalleRepository from "../repositories/aforoDetalleRepository.js";
import AforoRepository from "../repositories/aforoRepository.js";
import TipoEmpaqueRepository from "../repositories/tipoEmpaqueRepository.js";

class AforoDetalleService {

  async listByAforo(aforoId) {
    return await AforoDetalleRepository.findAllByAforo(aforoId);
  }

  async getById(id) {
    const det = await AforoDetalleRepository.findById(id);
    if (!det) throw new Error("Detalle no encontrado");
    return det;
  }

  async create(data) {
    const { aforo_id, tipo_empaque_id, cantidad } = data;

    if (!aforo_id || !tipo_empaque_id || !cantidad) {
      throw new Error("aforo_id, tipo_empaque_id y cantidad son obligatorios");
    }

    const empaque = await TipoEmpaqueRepository.findById(tipo_empaque_id);
    if (!empaque) throw new Error("Tipo de empaque no existe");

    // 🔥 CÁLCULO AUTOMÁTICO
    const volumen_m3 = cantidad * empaque.capacidad_m3;

    const created = await AforoDetalleRepository.create({
      aforo_id,
      tipo_empaque_id,
      cantidad,
      volumen_m3
    });

    await this._recalcularTotales(aforo_id);
    return created;
  }

  async update(id, data) {
    const existing = await this.getById(id);

    let volumen_m3 = existing.volumen_m3;

    if (data.cantidad || data.tipo_empaque_id) {
      const empaque = await TipoEmpaqueRepository.findById(
        data.tipo_empaque_id || existing.tipo_empaque_id
      );

      const cantidad = data.cantidad || existing.cantidad;
      volumen_m3 = cantidad * empaque.capacidad_m3;
    }

    const updated = await AforoDetalleRepository.update(id, {
      ...data,
      volumen_m3
    });

    await this._recalcularTotales(existing.aforo_id);
    return updated;
  }

  async delete(id) {
    const existing = await this.getById(id);
    await AforoDetalleRepository.delete(id);
    await this._recalcularTotales(existing.aforo_id);
    return true;
  }

  async _recalcularTotales(aforoId) {
    const sums = await AforoDetalleRepository.sumTotalsByAforo(aforoId);
    await AforoRepository.updateTotals(
      aforoId,
      parseFloat(sums.total_volumen) || 0,
      0 
    );
  }
}

export default new AforoDetalleService();
