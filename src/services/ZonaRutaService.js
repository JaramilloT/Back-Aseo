import ZonaRutaRepository from "../repositories/zonaRutaRepository.js";

class ZonaRutaService {

  async getAll() {
    return await ZonaRutaRepository.findAll();
  }

  async getAllColores() {
    return await ZonaRutaRepository.findAllColores();
  }

  async getByColor(color) {
    if (!color) throw new Error("Color es obligatorio");
    return await ZonaRutaRepository.findByColorRuta(color);
  }

  async getById(id) {
    const z = await ZonaRutaRepository.findById(id);
    if (!z) throw new Error("Zona/Ruta no encontrada");
    return z;
  }

  async create(data) {
    if (!data.nombre_zona) throw new Error("nombre_zona es obligatorio");
    return await ZonaRutaRepository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await ZonaRutaRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await ZonaRutaRepository.delete(id);
  }
}

export default new ZonaRutaService();