import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Upgrade Your Kitchen <br />
              with Premium Essentials
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover high-quality cookware, tools, and accessories to
              transform your cooking experience. From daily meals to gourmet
              feasts — we’ve got what you need.
            </p>
            <div className="flex gap-4">
              <a
                href="#shop"
                className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition"
              >
                Shop Now
              </a>
              <a
                href="#categories"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Categories
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://media.istockphoto.com/id/586162072/photo/various-kitchen-utensils.jpg?s=612x612&w=0&k=20&c=auwz9ZHqkG_UlKw5y-8UqvMLznA2PySQ_Jt3ameL1aU="
              alt="Kitchen Products"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
