import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  axios from  "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()

    function login(){

        console.log(email,password) 
        axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login",{
            email : email,
            password : password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token) //token save

                //const token = localStorage.getItem("token")  //read token (additional)

                toast.success("Login Successful")

                if(response.data.role == "admin"){

                    //go to the admin page
                    navigate("/admin")

                }else if(response.data.role == "customer"){

                    //go to the user page
                    navigate("/")

                }

            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )

    }
    

    return (
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-end items-center px-10">

            <div className="w-[500px] h-[500px] backdrop-blur-xs  rounded-[30px] relative text-white gap-[20px] 
            flex flex-col items-center shadow-[0_-15px_30px_rgba(0,0,0,0.6)] justify-center">

                <h1 className="text-4xl font-bold text-center my-5 absolute top-[20px] ">Login</h1>
                <div className="w-[350px] flex flex-col  items-start gap-2">
                    <span className="text-lg">Email</span>
                    <input 
                     onChange={
                        (e)=>{

                            setEmail(e.target.value)
                        }
                     }

                     type="text" className="w-[350px] h-[40px] border border-white rounded-[5px]"/>
                </div>

                <div className="w-[350px] flex flex-col  items-start gap-2">
                    <span className="text-lg">Password</span>
                    <input onChange={(e)=>{

                        setPassword(e.target.value)
                        
                    }
                  }
                     type="text" className="w-[350px] h-[40px] border border-white rounded-[5px]"/>

                </div>

                <button onClick={login} className="w-[350px] h-[40px] bg-red-600 rounded-xl text-white text-lg mt-5
                 hover:bg-red-700 transition-all duration-300">Login</button>

                 <p>Don't Have an account? <Link to="/signup" className="text-red-400">Sign Up</Link> from here</p>
                
            </div>
            
        </div>
    )
}
