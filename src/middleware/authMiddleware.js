import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  try {
    console.log(' verificarToken ejecutándose...');
    console.log(' Headers:', req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log('Token no proporcionado');
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "tu_secreto_super_seguro_cambiar_en_produccion"
    );
    req.usuario = decoded;
        
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const soloAseo = (req, res, next) => {
  if (req.usuario.rol !== "aseo") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: Solo personal de aseo" });
  }
  next();
};

export const soloAdministrativa = (req, res, next) => {
  if (req.usuario.rol !== "administrativa") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: Solo personal administrativo" });
  }
  next();
};