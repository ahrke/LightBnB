SELECT r.*, p.*, AVG (pr.rating) FROM properties p
  JOIN reservations r ON r.property_id = p.id
  JOIN property_reviews pr ON pr.property_id = p.id
  WHERE r.guest_id = 1
  GROUP BY r.id, r.*, p.id
  HAVING r.end_date < now()::date
  ORDER BY r.start_date DESC;
