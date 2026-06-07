const db =
require("../config/db");

const submitRating =
async (
  userId,
  storeId,
  rating
) => {

  const [existing] =
    await db.query(
      `
      SELECT *
      FROM ratings
      WHERE user_id=?
      AND store_id=?
      `,
      [
        userId,
        storeId
      ]
    );

  if (
    existing.length
  ) {

    await db.query(
      `
      UPDATE ratings
      SET rating=?
      WHERE user_id=?
      AND store_id=?
      `,
      [
        rating,
        userId,
        storeId
      ]
    );

    return "updated";
  }

  await db.query(
    `
    INSERT INTO ratings
    (
      user_id,
      store_id,
      rating
    )
    VALUES
    (
      ?,?,?
    )
    `,
    [
      userId,
      storeId,
      rating
    ]
  );

  return "created";
};

module.exports = {
  submitRating
};