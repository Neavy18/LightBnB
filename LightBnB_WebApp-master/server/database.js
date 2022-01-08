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
 * Get a single user from the database given their email.*/
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
 * Get all reservations for a single user. */

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
  return pool.query(queryString, queryParams).then((res) => res.rows);

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database  */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }

const addProperty = function(property) {

  return pool.query(`INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,[property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
  .then((result) => { 
    console.log("results row 0", result.rows[0])
    return result.rows[0];
  })  
  .catch((err) => {
  console.log(err.message, "---> addPROPERTY ERROR <--- ");
  });
};

exports.addProperty = addProperty;

pool.connect(()=>{
  console.log("connected to database");
});


