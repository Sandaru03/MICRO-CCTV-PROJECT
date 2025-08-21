
const url = "https://bohduxwpbptplsmevmft.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvaGR1eHdwYnB0cGxzbWV2bWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDE5NzcsImV4cCI6MjA3MTI3Nzk3N30.V0sGbwSJ6_2khAmOUHf8LpDim1yTkQrYx6UU9wyxGuI"

import { useState } from "react"
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(url,key)



export default function TestPage(){

    const [file,setfile] = useState(null);

    function handleUpload(){
        console.log(file);
        if(file==null){
            toast.error("please select a file to upload");
            return;
        }

        
    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <input type="file" accept="image/*" 
            onChange={
                (e)=>{
                  setfile(e.target.files[0]);
                }
            }/>

            <button onClick={handleUpload} className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">
                upload
            </button>
        </div>
    )
}