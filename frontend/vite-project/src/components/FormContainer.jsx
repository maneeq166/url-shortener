import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constant";

function FormContainer(props) {
    const {uploadReloadState} = props
    const [fullUrl,setFullUrl] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(fullUrl);            
            await axios.post(`${serverUrl}/shortUrl`,{
                fullUrl:fullUrl
            })
            setFullUrl("")
            uploadReloadState()
        } catch (error) {
            console.log(error);            
        }
    }

  return (
    <div className="container mx-auto p-2 ">
      <div className="bg-slate-700 my-5 rounded-xl">
        <div className="w-full h-full rounded-xl  p-20 backdrop-brightness-50">
          <h2 className="text-5xl text-white relative -top-5  text-center">URL Shortner</h2>
          <p className="text-white text-center pb-2 text-xl font-light">
            paste your untidy link
          </p>
          <p className="text-white text-center pb-4 text-xl font-extralight ">
            free tool to use for converting your untidy link to short link
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">urlshortner.link /</div>
                    <input type="text" value={fullUrl} onChange={(e)=>setFullUrl(e.target.value)} placeholder="add your link" required className="block w-full ps-32 bg-white p-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                    <button className="absolute top-0 end-0 p-3.5 text-white text-sm font-mono h-full bg-slate-700 round-xl focus:ring-4 focus:outline-none focus:ring-slate-500 " type="submit">Shorten URL</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
