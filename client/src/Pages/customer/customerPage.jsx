import { Routes, Route } from "react-router-dom"; 
import Header from "../../assets/components/header";
import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverView";


export default function ClientWebPage(){
    return(

         <div className="w-full h-screen max-h-screen">
            <Header/>

            <div className="w-full h-[calc(100%-90px)]">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-3xl text-red-700 text-center">Welcome to Home page</h1>}/>
                    <Route path="/shop" element={<ProductsPage/>}/>
                    <Route path="/service" element={<h1 className="text-3xl text-red-700 text-center">Welcome to service Page</h1>}/>
                    <Route path="/about" element={<h1 className="text-3xl text-red-700 text-center">Welcome to about Page</h1>}/>
                    <Route path="/contact" element={<h1 className="text-3xl text-red-700 text-center">Welcome to contact Page</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverViewPage/>}/>
                    <Route path="/*" element={<h1 className="text-3xl text-red-700 text-center">404 Not Found</h1>}/>  
                </Routes>
            </div>
         </div>

    )
   
}