SELECT p.*, AVG (r.rating) FROM properties p
  JOIN property_reviews r ON p.id = r.property_id
  GROUP BY p.id, p.*
  HAVING AVG (r.rating) > 4
  ORDER BY p.cost_per_night 
  LIMIT 10;
