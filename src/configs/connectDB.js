import Sequelize from "sequelize";


const sequelize = new Sequelize('todo_list', 'root', '', {
    dialect: 'mysql',
    dialectOptions: {
      // Your mysql2 options here
    }
  })


let connectDB = async () =>{
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

  export default connectDB;