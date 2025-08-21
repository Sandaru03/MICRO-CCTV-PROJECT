import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";


export default function ProductAdminPage(){
    const [products,setProducts] = useState([]);
    const [a,setA] = useState(0);
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/products").then(
                (res)=>{
                    setProducts(res.data)
                }
            )
        },
        [a]
    )

    const navigate = useNavigate();

    return(
        <div className="w-full h-full border-[3px]">

            <table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Image</th>
                        <th className="p-[10px]">Product ID</th>
                        <th className="p-[10px]">Product Name</th>
                        <th className="p-[10px]">Lable Price</th>
                        <th className="p-[10px]">Price</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (product,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>
                                            <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]" /> 
                                        </td>
                                        <td className="p-[10px]">{product.productId}</td>
                                        <td className="p-[10px]">{product.name}</td>
                                        <td className="p-[10px]">{product.price}</td>
                                        <td className="p-[10px]">{product.labellPrice}</td>
                                        <td className="p-[10px]">{product.stock}</td>
                                        <td className="p-[10px]">{product.category}</td>
                                        <td className="p-[10px]">
                                            <BiTrash className="bg-red-600 p-[5px] text-3xl rounded-full text-white shadow-2xl shadow-red-600 cursor-pointer"
                                             onClick={
                                                ()=>{
                                                    const token = localStorage.getItem("token");
                                                    if(token == null){
                                                        navigate("/login");
                                                        return;
                                                    }

                                                    axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + product.productId,
                                                        {
                                                            headers:{
                                                                Authorization : `Bearer ${token}`
                                                            }
                                                        }
                                                    ).then(
                                                        (res)=>{
                                                            console.log("Product deleted successfully");
                                                            console.log(res.data);
                                                            toast.success("Product Deleted Successfully")
                                                            setA(a+1);
                                                        }
                                                    ).catch(
                                                        (error)=>{
                                                            console.error("Error deleting product:",error);
                                                            toast.error(("Failed to delete product"));
                                                        }
                                                    )
                                                }
                                             }/>
                                        </td>

                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>


            <Link to={"/admin/newproduct"} className="fixed right-[50px] bottom-[50px] text-white bg-black rounded-[50px]">
                <HiMiniPlusCircle className="text-5xl"/></Link>
        </div>
    )
}