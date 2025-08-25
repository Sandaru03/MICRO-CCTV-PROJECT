import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../assets/components/loader";
import axios from "axios";
import ImageSlider from "../../assets/components/imageSlider";

export default function ProductOverViewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/products/${params.productId}`)
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to load product");
          setStatus("error");
        });
    }
  }, [status, params.productId]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 flex flex-col lg:flex-row gap-8">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Right Side: Details */}
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-start pl-[30px]">
          
            <h1 className="text-3xl font-bold text-gray-800">
              {product.name}{" "}
              <span className="font-light text-gray-500 text-xl">
                {product.altNames.join(" | ")}
              </span>
            </h1>

           
            <p className="text-gray-700 text-lg mt-4 leading-relaxed">
              {product.description}
            </p>

           
            <div className="mt-6">
              {product.labellPrice > product.price ? (
                <div className="flex items-center gap-4">
                 
                  <span className="text-2xl font-medium text-gray-500 line-through">
                    Rs{" "}{product.labellPrice.toFixed(2)}
                  </span>

                
                  <span className="text-3xl font-bold text-red-600">
                    Rs{" "}{product.price.toFixed(2)}
                  </span>

                  
                  <span className="ml-2 px-3 py-1 text-sm bg-red-100 text-red-600 font-semibold rounded-md">
                    {Math.round(
                      ((product.labellPrice - product.price) /
                        product.labellPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  Rs{" "}{product.price.toFixed(2)}
                </span>
              )}
            </div>

          
            <div className="flex flex-row gap-4 mt-8">
              <button className="px-6 py-3 rounded-xl shadow-lg text-white bg-red-700 border border-red-700 hover:bg-white hover:text-red-700 transition-all duration-300">
                Buy Now
              </button>
              <button className="px-6 py-3 rounded-xl shadow-lg text-white bg-red-500 border border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-center text-red-600 font-semibold">
           Error loading product. Please try again later.
        </div>
      )}
    </div>
  );
}
