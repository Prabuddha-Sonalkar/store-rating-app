const db =
  require("../config/db");

const {
  createStore,
  getStores
} = require(
  "../services/storeService"
);

const addStore = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      address,
      ownerId
    } = req.body;

    const [existing] =
      await db.query(
        `
        SELECT id
        FROM stores
        WHERE email = ?
        `,
        [email]
      );

    if (existing.length) {

      return res.status(400).json({
        success: false,
        message: "Store already exists"
      });

    }

    const storeId =
      await createStore(
        name,
        email,
        address,
        ownerId
      );

    res.status(201).json({
      success: true,
      storeId
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getAllStores = async (
  req,
  res
) => {

  try {

    const search =
      req.query.search || "";

    const sortField =
      req.query.sortField || "name";

    const sortOrder =
      req.query.sortOrder || "ASC";

    const stores =
      await getStores(
        req.user.id,
        search,
        sortField,
        sortOrder
      );

    res.json({
      success: true,
      stores
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  addStore,
  getAllStores
};