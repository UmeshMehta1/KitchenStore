const { getMyReviews, deleteReview, createReview } = require("../../controllers/user/review/reviewController")

const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router( )

// router.route("/reviews")
router.route("/").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/:id").delete(isAuthenticated,catchAsync( deleteReview)).post(isAuthenticated,restrictTo("customer"),catchAsync(createReview))

module.exports = router
