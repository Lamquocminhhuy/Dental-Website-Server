const { Sequelize } = require('sequelize');


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('nhakhoa', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối db thành công');
      } catch (error) {
        console.error('Chưa kết nối đc:', error);
      }
}

module.exports = connectDB;
