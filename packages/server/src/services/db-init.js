const SequelizeInit = require("./sequelize-init");

const DbInit = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await SequelizeInit.authenticate();
      console.log("Connection has been established successfully.");
      await SequelizeInit.sync({ force: true });
      console.log("Model synced successfully.");
      resolve();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      reject(error);
    }
  });
};

module.exports = DbInit;
