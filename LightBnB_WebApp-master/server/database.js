const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool({
  user: 'xnntuyjp',
  password: '8C7z4wJEgkJsewL6hwSOVDJO-rUbwyig',
  host: 'kashin.db.elephantsql.com',
  database: 'xnntuyjp',
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
exports.getUserWithId = getUserWithId;
/**
 * Add a new user to the database. */

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
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;

const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT *
  FROM reservations
  JOIN properties ON properties.id = property_id
  WHERE guest_id = $1
  LIMIT $2;`,[guest_id, limit])
.then((result) => { 
  return result.rows;
})
.catch((err) => {
console.log(err.message, "---> ERROR IN ALL <--- ");
});
};

exports.getAllReservations = getAllReservations

/// Properties

// /**
//  * Get all properties

// const getAllProperties = (options, limit = 10) => {
//   return pool
//     .query(`SELECT * FROM properties LIMIT $1`, [limit])
//     .then((result) => result.rows)
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if(options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id =  $${queryParams.length}`
  }

  if(options.minimum_price_per_night) {
    queryParams.push (options.minimum_price_per_night * 100);
    queryString += `AND properties.cost_per_night >= $${queryParams.length}`
  }

  if(options.maximum_price_per_night) {
    queryParams.push (options.maximum_price_per_night * 100);
    queryString += `AND properties.cost_per_night <= $${queryParams.length}`
  }

  if(options.minimum_rating) {
    queryParams.push (options.minimum_rating);
    queryString += `AND property_reviews.rating >= $${queryParams.length}`
  }
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database  */

const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

pool.connect(()=>{
  console.log("connected to database");
});


