import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("movies", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port:3306,

});


export const conectarBD = async () => {
 try {
   sequelize.authenticate();
   sequelize.sync()
   console.log("Conexión a la base de datos establecida correctamente.");
 } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
 }