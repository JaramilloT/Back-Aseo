import UsuarioService from "../services/UsuarioService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email y password son obligatorios" });
      }

      const usuario = await UsuarioService.getByEmail(email);
      
      if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      if (!usuario.activo) {
        return res.status(401).json({ error: "Usuario inactivo" });
      }

      const passwordValida = await bcrypt.compare(password, usuario.password);
      
      if (!passwordValida) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol
        },
        process.env.JWT_SECRET || "tu_secreto_super_seguro_cambiar_en_produccion",
        { expiresIn: "8h" }
      );

      const { password: _, ...usuarioSinPassword } = usuario;

      res.json({
        token,
        usuario: usuarioSinPassword
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async verificarToken(req, res) {
    res.json({
      usuario: req.usuario,
      valido: true
    });
  }
}

export default new AuthController();