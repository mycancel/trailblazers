const sequelize = require('../config/connection');

const seedUser = require('./userData');
const seedPark = require('./park-seeds');
const seedReview = require('./review-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await seedUser();

  await seedPark();

  await seedReview();

  process.exit(0);
};

seedDatabase();
