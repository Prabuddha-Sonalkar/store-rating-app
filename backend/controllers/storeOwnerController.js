const db =
require("../config/db");

const dashboard =
async (
  req,
  res
) => {

  try {

    const ownerId =
      req.user.id;

    const [[avgData]] =
      await db.query(
        `
        SELECT
        ROUND(
          AVG(r.rating),
          1
        ) AS averageRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id=r.store_id

        WHERE s.owner_id=?
        `,
        [ownerId]
      );

    const [users] =
      await db.query(
        `
        SELECT
          u.name,
          u.email,
          r.rating,
          s.name AS storeName

        FROM ratings r

        JOIN users u
        ON u.id=r.user_id

        JOIN stores s
        ON s.id=r.store_id

        WHERE s.owner_id=?
        `,
        [ownerId]
      );

    res.json({
      success:true,
      averageRating:
      avgData.averageRating,
      users
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

module.exports = {
  dashboard
};