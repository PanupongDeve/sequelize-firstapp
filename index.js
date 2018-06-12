const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: `${__dirname}/database/database.sqlite`
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



  const User = sequelize.define('user', { name: Sequelize.STRING })
  const Task = sequelize.define('task', { name: Sequelize.STRING })
  const Tool = sequelize.define('tool', { name: Sequelize.STRING })
  
  Task.belongsTo(User)
  User.hasMany(Task)
  User.hasMany(Tool)
  
 // force: true will drop the table if it already exists
  /*sequelize.sync({force: true}).then(() => {
    // Table created
    User.create({
      name: 'Panupog'
    });

    Task.create({
        name: 'Task_Panupog',
        userId: 1
    });

    Tool.create({
        name: 'Tool_Panupog',
        userId: 1
    });

    console.log('Table created!!!!');
  }); */

  /*User.create({
    firstName: 'testtt',
    lastName: 'Hancock'
  })*/


  User.findAll({ include: [ Task, Tool ] }).then(usersData => {
    console.log(JSON.parse(JSON.stringify(usersData)));
  });