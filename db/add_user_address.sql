INSERT INTO mw_address (address1,city,state,postalcode,place,lat,long,user_id, defaultaddress) VALUES($1,$2,$3,$4,$5,$6,$7,$8, false) RETURNING *;