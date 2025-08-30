import { Routes, Route } from "react-router-dom"; 
import Header from "../../assets/components/header";
import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import HomePage from "../homePage";


export default function ClientWebPage(){
    return(

         <div className="w-full h-screen max-h-screen">
            <Header/>

            <div className="w-full h-[calc(100%-90px)]">
                <Routes path="/">
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<ProductsPage/>}/>
                    <Route path="/service" element={<h1 className="text-3xl text-red-700 text-center">Welcome to service Page</h1>}/>
                    <Route path="/about" element={<h1 className="text-3xl text-red-700 text-center">Welcome to about Page</h1>}/>
                    <Route path="/contact" element={<h1 className="text-3xl text-red-700 text-center">Welcome to contact Page</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverViewPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/*" element={<h1 className="text-3xl text-red-700 text-center">404 Not Found</h1>}/>  
                </Routes>
            </div>
         </div>

    )
   
}