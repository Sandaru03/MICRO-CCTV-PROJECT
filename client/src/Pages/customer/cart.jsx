import { useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


export default function CartPage() {

  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col py-[40px] items-center">
      {
        cart.map(
            (item) => {
          return (
            <div key={item.productId} className="w-[900px] h-[150px] m-[10px] shadow-2xl flex flex-row items-center transition-transform hover:-translate-y-1 duration-200">
                <img src={item.image} alt={item.name} className="w-[80px] h-[80px] ml-[20px]"/>
                <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-semibold">Rs {(item.price).toFixed(2)}</span> 
                </div>
                <div className="w-[190px] h-full flex flex-row justify-center items-center">
                    <button className="cursor-pointer text-3xl" onClick={
                        ()=>{
                            addToCart(item,-1);
                            setCart(getCart());
                        }
                    }>-</button>
                    <span className="mx-[10px] text-xl">{item.quantity}</span>
                    <button className="cursor-pointer text-xl" onClick={
                        ()=>{
                            addToCart(item,1);
                            setCart(getCart());
                        }
                    }>+</button>  
                </div>
                <div className="w-[190px] h-full flex justify-end items-center pr-[20px]">
                    <span className="font-bold">Rs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <button className="w-[30px] h-[30px] bg-red-600 text-white font-bold hover:bg-red-500 cursor-pointer rounded-full mr-[20px] flex items-center justify-center " onClick={
                    ()=>{
                        addToCart(item,-item.quantity);
                        setCart(getCart());
                    }
                }>
                    <RiDeleteBin5Fill />
                </button>
            </div>
          );
        })
      }

      <div className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center justify-end relative">
        <span className="font-bold text-xl mr-[20px]">
            Total: Rs {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} 
            </span>

            <button className="absolute left-10 bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-500 cursor-pointer transition" onClick={
                ()=>{
                    navigate("/checkout",{state:{items:cart}});
                } 
            }>Checkout</button>
      </div>


    </div>
  );
}
