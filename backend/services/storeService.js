const db = require("../config/db");

const createStore = async (
  name,
  email,
  address,
  ownerId
) => {

  const [result] = await db.query(
    `
    INSERT INTO stores
    (
      name,
      email,
      address,
      owner_id
    )
    VALUES
    (
      ?,?,?,?
    )
    `,
    [
      name,
      email,
      address,
      ownerId
    ]
  );

  return result.insertId;
};

const getStores = async (
  userId,
  search = "",
  sortField = "name",
  sortOrder = "ASC"
) => {

  const allowedFields = [
    "name",
    "email"
  ];

  if (
    !allowedFields.includes(
      sortField
    )
  ) {
    sortField = "name";
  }

  if (
    sortOrder !== "ASC" &&
    sortOrder !== "DESC"
  ) {
    sortOrder = "ASC";
  }

  const [stores] = await db.query(
    `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,

      ROUND(
        AVG(r.rating),
        1
      ) AS averageRating,

      (
        SELECT rating
        FROM ratings
        WHERE user_id = ?
        AND store_id = s.id
      ) AS userRating

    FROM stores s

    LEFT JOIN ratings r
      ON s.id = r.store_id

    WHERE
      s.name LIKE ?
      OR s.address LIKE ?

    GROUP BY s.id

    ORDER BY ${sortField}
    ${sortOrder}
    `,
    [
      userId,
      `%${search}%`,
      `%${search}%`
    ]
  );

  return stores;
};

const getStoresForUser = async (
  userId,
  search = ""
) => {

  const [stores] = await db.query(
    `
    SELECT

      s.id,
      s.name,
      s.address,

      ROUND(
        AVG(r.rating),
        1
      ) AS averageRating,

      MAX(
        CASE
          WHEN r.user_id = ?
          THEN r.rating
        END
      ) AS userRating

    FROM stores s

    LEFT JOIN ratings r
      ON s.id = r.store_id

    WHERE
      s.name LIKE ?
      OR s.address LIKE ?

    GROUP BY s.id
    `,
    [
      userId,
      `%${search}%`,
      `%${search}%`
    ]
  );

  return stores;
};

module.exports = {
  createStore,
  getStores,
  getStoresForUser
};