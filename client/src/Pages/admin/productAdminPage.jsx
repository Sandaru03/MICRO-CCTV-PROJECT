import { HiMiniPlusCircle } from "react-icons/hi2";
import { Link } from "react-router-dom"; 


export default function ProductAdminPage(){
    return(
        <div className="w-full h-full border-[3px]">
            <Link to={"/admin/newproduct"} className="fixed right-[50px] bottom-[50px] text-white bg-black rounded-[50px]">
                <HiMiniPlusCircle className="text-5xl"/></Link>
        </div>
    )
}