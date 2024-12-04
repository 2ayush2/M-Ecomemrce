import authorizeAdmin, { isProtected } from "../middlewares/authorizeRoute.js";
import checkObjectId from "../utils/checkObjectId.js";
import {
  handleGetAllProducts,
  handleGetProductById,
  handleGetTopProducts,
  handleGetProductsByFilter,
  handleCreateNewProduct,
} from "../controllers/productController.js";
import router from "./categoryRoute.js";

router
  .route("/products")
  .get(isProtected(["customer", "admin"]), handleGetAllProducts)
  .post(isProtected(["admin"]), authorizeAdmin(), handleCreateNewProduct); // this will handled by admin (will do it later on)

router.get(
  "/products/top",
  isProtected(["customer", "admin"]),
  handleGetTopProducts
);

router
  .route("/products/:id")
  .get(isProtected(["customer", "admin"]), checkObjectId, handleGetProductById);

router.get(
  "/products/u/filter",
  isProtected(["customer", "admin"]),
  handleGetProductsByFilter
);

// deleting products by admin is yet to handle

export default router;
