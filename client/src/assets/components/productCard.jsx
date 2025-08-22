export default function ProductCard({ product }) {
    return (
        <div className="w-[250px] h-[350px] bg-white border shadow-lg rounded-2xl p-4 flex flex-col">
            <div className="w-full h-[180px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/250"} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>
            <p className="text-gray-600 text-sm flex-1 line-clamp-2">{product.description}</p>
            <span className="mt-2 font-bold text-red-600">Rs.{product.price}.00</span>
        </div>
    )
}
