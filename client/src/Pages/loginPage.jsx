import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-end items-center px-10">

            <div className="w-[500px] h-[500px] backdrop-blur-xs  rounded-[30px] relative text-white gap-[20px] 
            flex flex-col items-center shadow-[0_-15px_30px_rgba(0,0,0,0.6)] justify-center">

                <h1 className="text-4xl font-bold text-center my-5 absolute top-[20px] ">Login</h1>
                <div className="w-[350px] flex flex-col  items-start gap-2">
                    <span className="text-lg">Email</span>
                    <input type="text" className="w-[350px] h-[40px] border border-white rounded-[5px]"/>
                </div>

                <div className="w-[350px] flex flex-col  items-start gap-2">
                    <span className="text-lg">Password</span>
                    <input type="text" className="w-[350px] h-[40px] border border-white rounded-[5px]"/>
                </div>

                <button className="w-[350px] h-[40px] bg-red-600 rounded-xl text-white text-lg mt-5
                 hover:bg-red-700 transition-all duration-300">Login</button>

                 <p>Don't Have an account? <Link to="/signup" className="text-red-400">Sign Up</Link> from here</p>
                
            </div>
            
        </div>
    )
}
