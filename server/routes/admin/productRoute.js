// const { createProduct, deleteProduct, editProduct, updateProductStatus, updateProductStockAndPrice, getOrdersOfAProduct } = require("../../controller/admin/product/productController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")

const router = require("express").Router()
const {multer,storage  } = require("../../middleware/multerConfig")
const catchAsync = require("../../Services/catchAsync")
const { getProducts, getProduct, createProduct, deleteProduct, editProduct } = require("../../controllers/admin/product/productController")
const upload = multer({storage : storage})


// router.post("/",createProduct)
// router.get("/products",getProducts)

router.route("/")
.post(isAuthenticated,restrictTo("admin"),upload.single('productImage'), catchAsync(createProduct))
.get( catchAsync(getProducts))

// router.route("/productOrders/:id").get(isAuthenticated,restrictTo("admin"),catchAsync(getOrdersOfAProduct))
// router.route("/status/:id")
// .patch(isAuthenticated,restrictTo("admin"),updateProductStatus) 

// router.route("/stockprice/:id")
// .patch(isAuthenticated,restrictTo("admin"),updateProductStockAndPrice) 

router.route("/:id")
.get( catchAsync(getProduct))
.delete( isAuthenticated,restrictTo("admin"), catchAsync(deleteProduct))
.patch(isAuthenticated,restrictTo("admin"),upload.single('productImage'), editProduct) 

module.exports = router 