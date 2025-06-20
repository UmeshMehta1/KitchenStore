import React from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem, udpateCartItem } from "../../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { item: products } = useSelector((state) => state.cart);
  console.log("cart", products);

  const totalItemsInCart = products.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const totalAmountOfCart = products.reduce(
    (amount, item) => amount + item.quantity * item.product.productPrice,
    0
  );

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(udpateCartItem(productId, newQuantity));
  };

  const handleDelete = (productId) => {
    dispatch(deleteCartItem(productId));
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      {/* My Cart */}
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-blue-900 text-xl font-extrabold">My cart</p>
        {/* Product */}

        {products.map((product) => {
          return (
            <div
              key={product.product._id}
              className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
            >
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                {/* Product Information */}
                <div className="flex flex-row gap-6 items-center">
                  <div className="w-28 h-28">
                    <img
                      className="w-full h-full"
                      src="https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-masculino/09/NQQ-4635-309/NQQ-4635-309_zoom1.jpg?ts=1675445414&ims=544x"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg text-gray-800 font-semibold">
                      {product.product.productName}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold">
                      Color: <span className="font-normal">Black + Zinc</span>
                    </p>
                    <p className="text-xs text-gray-600 font-semibold">
                      Size: <span className="font-normal">42</span>
                    </p>
                  </div>
                </div>
                {/* Price Information */}
                <div className="self-center text-center">
                  <p className="text-gray-800 font-normal text-xl">
                    RS.{product.product.productPrice}
                  </p>
                </div>
                {/* Remove Product Icon */}
                <div className="self-center">
                  <button onClick={() => handleDelete(product.product._id)}>
                    <svg
                      className
                      height="24px"
                      width="24px"
                      id="Layer_1"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      version="1.1"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g>
                        <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
                        <g>
                          <rect height={241} width={14} x={249} y={160} />
                          <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                          <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Product Quantity */}
              <div className="flex flex-row self-center gap-1">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.product._id,
                      product.quantity - 1
                    )
                  }
                  className="w-5 h-5 self-center rounded-full border border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={product.quantity}
                  onClick={(e) =>
                    handleQuantityChange(
                      product.product._id,

                      e.target.value
                    )
                  }
                  readOnly="readonly"
                  defaultValue={1}
                  className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"
                />
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.product._id,
                      product.quantity + 1
                    )
                  }
                  className="w-5 h-5 self-center rounded-full border border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Purchase Resume */}
      <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
        <p className="text-blue-900 text-xl font-extrabold">Purchase Resume</p>
        <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Total Items</p>
            <p className="text-end font-bold">{totalItemsInCart}</p>
          </div>
          <hr className="bg-gray-200 h-0.5" />

          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Total Amount</p>
            <div>
              <p className="text-end font-bold">RS. {totalAmountOfCart}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
              FINISH
            </button>
            <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
              ADD MORE PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
