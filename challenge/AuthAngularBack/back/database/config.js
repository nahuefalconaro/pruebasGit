const mongoose = require("mongoose");
//nos ayuda a hacer interacciones con la base de mongo
const dbConnection = async () => {
  try {
    mongoose.set('autoIndex', true)
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.dbmongo);
    console.log('db online');
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error", error);
  }
};

module.exports = {
    dbConnection
}