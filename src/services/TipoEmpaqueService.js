import TipoEmpaqueRepository from "../repositories/tipoEmpaqueRepository.js";

class TipoEmpaqueService {

  async getAll() {
    return await TipoEmpaqueRepository.findAll();
  }

  async getById(id) {
    const e = await TipoEmpaqueRepository.findById(id);
    if (!e) throw new Error("Tipo de empaque no encontrado");
    return e;
  }

  async create(data) {
    if (!data.tipo) throw new Error("tipo es obligatorio");
    if (!data.capacidad_m3) throw new Error("capacidad_m3 es obligatoria");

    data.capacidad_m3 = parseFloat(data.capacidad_m3);
    return await TipoEmpaqueRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await TipoEmpaqueRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await TipoEmpaqueRepository.delete(id);
  }
}

export default new TipoEmpaqueService();
