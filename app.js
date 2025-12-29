import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import aforoRoutes from "./src/routes/aforo.routes.js";
import aforoDetalleRoutes from "./src/routes/aforoDetalle.routes.js";
import tipoEmpaqueRoutes from "./src/routes/tipoEmpaque.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import zonaRutaRoutes from "./src/routes/zonaRuta.routes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Sistema de Aforo EMCA",
    version: "1.0.0",
    endpoints: {
      aforos: "/api/aforos",
      aforoDetalles: "/api/aforo-detalles",
      tipoEmpaque: "/api/tipo-empaque",
      usuarios: "/api/usuarios",
      zonaRutas: "/api/zona-rutas"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/aforos", aforoRoutes);
app.use("/api/aforo-detalles", aforoDetalleRoutes);
app.use("/api/tipo-empaque", tipoEmpaqueRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/zona-rutas", zonaRutaRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVIDOR INICIADO");
  console.log(` Puerto: ${PORT}`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` API: http://localhost:${PORT}/api`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log("Presiona CTRL+C para detener\n");
});

export default app;