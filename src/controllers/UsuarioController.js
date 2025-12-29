import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {
  async getAll(req, res) {
    try {
      res.json(await UsuarioService.getAll());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      res.json(await UsuarioService.getById(req.params.id));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const created = await UsuarioService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      console.error("Error en create:", err);
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      res.json(await UsuarioService.update(req.params.id, req.body));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await UsuarioService.delete(req.params.id);
      res.json({ message: "Usuario eliminado" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UsuarioController();