import { Link , Route , Routes } from "react-router-dom";
import ProductAdminPage from "./admin/productAdminPage";
import { RiAdminFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import AddProductPage from "./admin/addProductAdminPage";





export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="w-[300px] h-full flex  flex-col items-center">
                <span className="text-3xl font-bold my-5">Admin Dashboard</span>

                <Link className="flex flex-row h-[60px] w-full  p-[20px] items-center text-xl gap-[25px]" to="/admin/add-admin" ><RiAdminFill />Admin</Link>
                <Link className="flex flex-row h-[60px] w-full  p-[20px] items-center text-xl gap-[25px]" to="/admin/employee"><IoPeople />Employee</Link>
                <Link className="flex flex-row h-[60px] w-full  p-[20px] items-center text-xl gap-[25px]" to="/admin/supplier"><IoPeopleCircleOutline />Supplier</Link>
                <Link className="flex flex-row h-[60px] w-full  p-[20px] items-center text-xl gap-[25px]" to="/admin/product"><HiShoppingBag />Product</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full">
                <Routes path="/">
                  <Route path="/" element={<h1>Dashboard</h1>}/>
                  <Route path="/product" element={<ProductAdminPage/>}/>
                  <Route path="/order" element={<h1>Order</h1>}/>
                  <Route path="/newproduct" element={<AddProductPage/>}/>
                </Routes>
                
            </div>
        </div>
    )
}