const { dbConnection } = require("../config/config");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const seedUsers = async () => {
  try {
    await dbConnection();

    await User.deleteMany();

    const petNames = [
      "Pelusa",
      "Bigotes",
      "Manchitas",
      "Copito",
      "Canela",
      "Luna",
      "Toby",
      "Rocky",
      "Milo",
      "Nube",
      "Chispa",
      "Kira",
      "Choco",
      "Galleta",
      "Coco",
    ];

    const images = [
      "https://i.imgur.com/MnohCac.png",
      "https://i.imgur.com/1CeZ2x4.png",
      "https://i.imgur.com/QTkp6j9.png",
      "https://i.imgur.com/HsgXVcT.png",
    ];

    const users = await Promise.all(
      petNames.map(async (name) => ({
        name: name,
        email: `${name.toLowerCase()}@patitas.com`,
        password: await bcrypt.hash("123", 10),
        confirmed: true,
        image: images[Math.floor(Math.random() * images.length)],
      }))
    );

    const created = await User.insertMany(users);
    console.log("Usuarios creados con éxito:");
    created.forEach((u) => console.log(`✔ ${u.name} (${u.email})`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
