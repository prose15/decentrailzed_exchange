import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom"

const TranscationHistory = () => {
    const [message,setMessage] = useState([])
    const dbRef = collection(db, "transcations")
    const cookies = new Cookies()
    const name = cookies.get("name")
    useEffect(()=>{
        const queryMessages = query(dbRef , where("name", "==", name))
        onSnapshot(queryMessages, (snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data() , id: doc.id});
            })
            setMessage(messages)
        })
    },[])
    console.log(message);
  return (
    <div className="bg-[#050816] h-screen ">
    <Link to={'/homepage'} className="ml-12 py-4 cursor-pointer"><FaHome size={40} className="text-gray-500"/></Link>

    <div className="py-24">
    <div className="bg-gray-800 p-8 rounded-lg shadow-[#915EFF] shadow-2xl w-[50%] mx-auto">
   
   {message.map(data => <div className="my-4 p-4 border-b border-white">   <p className="text-gray-400 flex justify-between md:mx-12">From : <p className="text-white ">{data.histories.asset_id_base}</p></p> 
   <p className="text-gray-400 flex justify-between md:mx-12">To : <p className="text-white ">{data.histories.asset_id_quote}</p></p> 
   <p className="text-gray-400 flex justify-between md:mx-12">Given amount : <p className="text-white">{data.amount}</p></p> 
   <p className="text-gray-400 flex justify-between md:mx-12">You got : <p className="text-white">{data.result}</p></p> 
   </div>)}

</div>
    </div>
    
  </div>
  )
}

export default TranscationHistory