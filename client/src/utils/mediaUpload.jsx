const url = "https://bohduxwpbptplsmevmft.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvaGR1eHdwYnB0cGxzbWV2bWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDE5NzcsImV4cCI6MjA3MTI3Nzk3N30.V0sGbwSJ6_2khAmOUHf8LpDim1yTkQrYx6UU9wyxGuI"

import {createClient} from "@supabase/supabase-js";

const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise = new Promise(
        (resolve,reject)=>{

            if(file == null){
                reject("Please select a file to upload");
                return;
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl : "3600",
                upsert : false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file");
                }
            )
        }
    )
    return promise;

}

