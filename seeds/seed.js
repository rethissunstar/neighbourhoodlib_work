const sequelize = require('../config/connection');
const { participants } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const participants = await participants.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
