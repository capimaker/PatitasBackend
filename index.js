const express = require("express");
const app = express();
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");
const PORT = process.env.PORT;
const { dbConnection } = require("./config/config");
const cors = require("cors");
const path = require("path");

//MIDDLEWARE
app.use(express.json());
app.use(cors());

dbConnection();

//RUTAS
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/user", require("./routes/user"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

//Ruta estática para poner a disposición las imágenes subidas desde local en frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//SERVIDOR
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
