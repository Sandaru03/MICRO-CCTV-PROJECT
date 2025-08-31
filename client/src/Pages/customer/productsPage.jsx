import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../assets/components/loader";
import ProductCard from "../../assets/components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sort, setSort] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [query, setQuery] = useState("");

 useEffect(() => {
  if (loading) {
    if(query === ""){
      
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    } else {
      
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search/" + query).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    }
  }
}, [loading, query]);


  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
    .filter((p) => categoryFilter === "all" ? true : p.category === categoryFilter)
    .sort((a, b) => {
      if(sort==="latest") return b.productId - a.productId
      if(sort==="price-low-high") return a.price - b.price
      if(sort==="price-high-low") return b.price - a.price
      return 0
    });

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[300px] h-full flex flex-col border-r p-5 bg-gray-50">
        <span className="text-2xl font-bold mb-6">Shop</span>

        {/* Search */}
        <input
        type="text"
        placeholder="Search Products..."
        value={query}
        onChange={(e) =>{
        setQuery(e.target.value);
        setLoading(true);
       }}
       className="w-full p-2 mb-6 border rounded-lg"
      />


        {/* Price Filter */}
        <span className="font-semibold mb-2">Filter By Price</span>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 p-2 border rounded-lg"
            placeholder="Min"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-1/2 p-2 border rounded-lg"
            placeholder="Max"
          />
        </div>

        {/* Category Filter */}
        <span className="font-semibold mb-2">Products Category</span>
        <div className="flex flex-col gap-2 text-gray-700">
          <button onClick={() => setCategoryFilter("all")} className="text-left hover:text-red-600 cursor-pointer">All</button>
          <button onClick={() => setCategoryFilter("cctv1")} className="text-left hover:text-red-600 cursor-pointer">CCTV 1</button>
          <button onClick={() => setCategoryFilter("cctv2")} className="text-left hover:text-red-600 cursor-pointer">CCTV 2</button>
          <button onClick={() => setCategoryFilter("cctv3")} className="text-left hover:text-red-600 cursor-pointer">CCTV 3</button>
          <button onClick={() => setCategoryFilter("cctv4")} className="text-left hover:text-red-600 cursor-pointer">CCTV 4</button>
          <button onClick={() => setCategoryFilter("cctv5")} className="text-left hover:text-red-600 cursor-pointer">CCTV 5</button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-[calc(100%-300px)] h-full overflow-y-auto p-6 flex flex-col">
        
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            
            {/* Sort dropdown above grid, aligned left */}
            <div className="flex justify-start mb-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border p-2 rounded-lg cursor-pointer"
              >
                <option value="latest">Sort by latest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Grid */}
            <div className="w-full flex flex-wrap gap-[60px] justify-start items-start">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="group relative w-[250px] transition-transform duration-300 transform hover:-translate-y-4 hover:scale-105 shadow-lg rounded-2xl"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}