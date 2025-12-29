import TipoEmpaqueService from "../services/TipoEmpaqueService.js";

class TipoEmpaqueController {
  async getAll(req, res) {
    try {
      res.json(await TipoEmpaqueService.getAll());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      res.json(await TipoEmpaqueService.getById(req.params.id));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const created = await TipoEmpaqueService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      res.json(await TipoEmpaqueService.update(req.params.id, req.body));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await TipoEmpaqueService.delete(req.params.id);
      res.json({ message: "TipoEmpaque eliminado" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new TipoEmpaqueController();