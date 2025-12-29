import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'jara123',
  database: process.env.DB_NAME || 'sistema_aforo',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(' Conexión a MySQL exitosa');
    console.log(`Base de datos: ${process.env.DB_NAME}`);
    connection.release();
  } catch (error) {
    console.error(' Error conectando a MySQL:', error.message);
    console.error('Verifica tus credenciales en el archivo .env');
    process.exit(1);
  }
};

// Probar conexión al iniciar
testConnection();

// Exportar como default
export default pool;