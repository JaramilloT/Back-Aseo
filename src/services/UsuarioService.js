import UsuarioRepository from "../repositories/usuarioRepository.js";
import bcrypt from "bcryptjs";

class UsuarioService {

  async getAll() {
    return await UsuarioRepository.findAll();
  }

  async getById(id) {
    const u = await UsuarioRepository.findById(id);
    if (!u) throw new Error("Usuario no encontrado");
    return u;
  }

  async getByEmail(email) {
    const u = await UsuarioRepository.findByEmail(email);
    if (!u) throw new Error("Usuario no encontrado");
    return u;
  }

  async create(data) {
    if (!data.nombre || !data.email || !data.password) {
      throw new Error("nombre, email y password son obligatorios");
    }

    const exists = await UsuarioRepository.findByEmail(data.email);
    if (exists) throw new Error("Ya existe un usuario con ese email");

    data.password = await bcrypt.hash(data.password, 10);
    return await UsuarioRepository.create(data);
  }

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await UsuarioRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await UsuarioRepository.delete(id);
  }
}

export default new UsuarioService();
