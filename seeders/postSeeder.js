const { dbConnection } = require("../config/config");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const { faker } = require("@faker-js/faker");

const images = [
  "https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg",
  "https://images.pexels.com/photos/1093126/pexels-photo-1093126.jpeg",
  "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg",
  "https://images.pexels.com/photos/321900/pexels-photo-321900.jpeg",
  "https://images.pexels.com/photos/7722506/pexels-photo-7722506.jpeg",
  "https://images.pexels.com/photos/1643456/pexels-photo-1643456.jpeg",
  "https://images.pexels.com/photos/20400679/pexels-photo-20400679.jpeg",
  "https://images.pexels.com/photos/20171002/pexels-photo-20171002.jpeg",
  "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg",
  "https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg",
  "https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg",
];

const randomImages = () => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3);
  return shuffled.slice(0, count);
};

const postSeeders = async () => {
  try {
    await dbConnection();

    await Post.deleteMany();

    const users = await User.find();

    if (!users.length) {
      console.error("❌ No hay usuarios en la base de datos.");
      process.exit(1);
    }

    const posts = [];

    for (const user of users) {
      const numPosts = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numPosts; i++) {
        posts.push({
          title: user.name + " y sus aventuras",
          body: faker.lorem.paragraph(),
          user: user._id,
          image: randomImages(),
          comments: [],
          likes: [],
        });
      }
    }
    const created = await Post.insertMany(posts);
    console.log(`✔ ${created.length} posts creados con éxito`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear los post: ", error);
    process.exit(1);
  }
};

postSeeders();
