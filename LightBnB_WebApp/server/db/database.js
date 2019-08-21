const db = require('./index');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = {
    text: `
      SELECT * FROM users
      WHERE email = $1;
    `,
    values: [email]
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows[0]);
    });
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = {
    text: `
      SELECT * FROM users
      WHERE id = $1;
    `,
    values: [id]
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows[0]);
    });
  })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = {
    text: `
      INSERT INTO users (name, email, password)
      VALUES
        ($1, $2, $3) 
      RETURNING *;
    `,
    values: [user.name, user.email, user.password]
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows);
    });
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = {
    text: `
    SELECT r.*, p.*, AVG (pr.rating) FROM properties p
      LEFT OUTER JOIN reservations r ON r.property_id = p.id
      JOIN property_reviews pr ON pr.property_id = p.id
      WHERE r.guest_id = $1
      GROUP BY r.id, p.id
      HAVING r.end_date < now()::date
      ORDER BY r.start_date DESC
      LIMIT $2;
    `,
    values: [guest_id, limit]
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows);
    });
  })
}
exports.getAllReservations = getAllReservations;

// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  // Build necessary query statement
  let queryString = `
  SELECT p.*, avg(pr.rating) as average_rating
  FROM properties p
  LEFT OUTER JOIN property_reviews pr ON p.id = pr.property_id
  `;

  // Account for search options. Append to query based on set options, in conjunction with other options selected
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += 
      (queryParams.length > 1)
      ? 'AND '
      : 'WHERE '
    queryString += `owner_id = $${queryParams.length} `
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night, options.maximum_price_per_night);
    queryString += 
      (queryParams.length > 2)
      ? 'AND '
      : 'WHERE '
    queryString += `
      cost_per_night > $${queryParams.length - 1}
      AND cost_per_night < $${queryParams.length}
    `
  }

  queryString += `
    GROUP BY p.id
  `

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `
      HAVING avg(pr.rating) > $${queryParams.length}
    `
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  // Build query object then return query Promise 
  const query = {
    text: queryString,
    values: queryParams
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows);
    });
  })
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryParams = [
    property.owner_id, 
    property.title,
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url,
    property.cost_per_night, 
    property.street, 
    property.city, 
    property.province, 
    property.post_code, 
    property.country,
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms
  ]
  let queryStr = `
    INSERT INTO properties 
      (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
        cost_per_night, street, city, province, post_code, country,
        parking_spaces, number_of_bathrooms, number_of_bedrooms)
      VALUES 
        ( $1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, $14
        )
      RETURNING *;
  `;

  const query = {
    text: queryStr,
    values: queryParams
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows);
    });
  })
}
exports.addProperty = addProperty;


/**
 * Add a reservation to the database
 * @param {{}} reservation An object containing all of the reservation details.
 * @return {Promise<{}>} A promise to the reservation.
 */
const addReservation = function(reservation) {
  let queryParams = [
    reservation.guest_id,
    reservation.start,
    reservation.end, 
    reservation.property_id
  ]
  let queryStr = `
    INSERT INTO reservations 
      (guest_id, start_date, end_date, property_id)
      VALUES 
        ( $1, $2, $3, $4 )
      RETURNING *;
  `;

  const query = {
    text: queryStr,
    values: queryParams
  };

  return new Promise((resolve, reject) => {
    db.query(query.text, query.values, (err, res) => {
      if (err) {
        console.error('query error',err.stack);
        reject(err);
      }
      resolve(res.rows);
    });
  })
}
exports.addReservation = addReservation;