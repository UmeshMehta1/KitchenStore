import React from "react";
import { useParams } from "react-router-dom";
import Product from "../product/Product";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Product id={id} />
    </div>
  );
};

export default ProductDetail;
