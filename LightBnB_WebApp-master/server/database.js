const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
});

/// Users


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
 return pool.query(`
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1;`, [email])
    .then((result) => { 
      return result.rows[0];
    })
    .catch((err) => {
    console.log(err.message, "---> get USER email ERROR WITH THE USER ID SQL CODE <--- ");
    });
  };

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id. */

const getUserWithId= function(id) {
  return pool.query(`
       SELECT *
       FROM users
       WHERE id = $1`, [id])
     .then((result) => { 
       return result.rows[0];
     })
     .catch((err) => {
     console.log(err.message, "---> get USER WITH IDERROR WITH THE USER ID SQL CODE <--- ");
     });
   };


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }

const addUser = function(user) {
  return pool.query(
  `INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3)`, [user.name, user.password, user.email])
  .then((result) => { 
    return result.rows[0];
  })  
  .catch((err) => {
  console.log(err.message, "---> addUSER ERROR WITH THE USER ID SQL CODE <--- ");
  });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;


/// Properties

// /**
//  * Get all properties

const getAllProperties = (options, limit = 10) => {
  pool
    .query(`
      SELECT *,
      FROM properties
      LIMIT = $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
    console.log(err.message);
    });
  };

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database  */

const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}

pool.connect(()=>{
  console.log("connected to database");
});

exports.addProperty = addProperty;
