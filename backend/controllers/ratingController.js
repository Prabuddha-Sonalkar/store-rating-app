const {
  submitRating
} = require(
  "../services/ratingService"
);

const addRating =
async (
  req,
  res
) => {

  try {

    const userId =
      req.user.id;

    const {
      storeId,
      rating
    } = req.body;

    if (
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400)
      .json({
        success:false,
        message:
        "Rating must be between 1 and 5"
      });
    }

    const result =
      await submitRating(
        userId,
        storeId,
        rating
      );

    res.json({
      success:true,
      message:result
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

module.exports = {
  addRating
};