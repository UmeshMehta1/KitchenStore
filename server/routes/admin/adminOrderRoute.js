const { getAllOrders, getSingleOrder, updateOrderStatus, deleteOrder, updatePaymentStatus } = require("../../controllers/admin/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const catchAsync = require("../../Services/catchAsync")

const router = require("express").Router()

router.route("/orders").get(isAuthenticated,restrictTo("admin"),catchAsync(getAllOrders))
router.route("/orders/paymentstatus/:id").patch(isAuthenticated,restrictTo("admin"),catchAsync(updatePaymentStatus))
router.route("/orders/:id").get(isAuthenticated,restrictTo("admin"),catchAsync(getSingleOrder)).patch(isAuthenticated,restrictTo("admin"),catchAsync(updateOrderStatus)).delete(isAuthenticated,restrictTo("admin"),catchAsync(deleteOrder))


module.exports = router