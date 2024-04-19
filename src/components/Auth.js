import { auth , provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import TypewriterComponent from "typewriter-effect";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies()
const nameCookie = new Cookies()

const Auth = () => {
    const nav = useNavigate() 
    const handleAuth = () =>{
        signInWithPopup(auth,provider).then((result)=>{
          console.log(result);
          cookies.set('auth-token', result.user.uid)
          nameCookie.set('name',result.user.displayName)
          nav('/homepage')
        }).catch((err)=>{
          console.log(err)
        })
      }
  return (
    <div className="bg-[#050816]  h-screen">
    <div className="text-3xl text-[#915EFF] flex justify-center py-12 font-bold">
    <TypewriterComponent
options={{
  strings: ['Welcome to Decentralized exchange','Swap  between two crpto coins'],
  autoStart: true,
  loop : true,
  typingDelay: 50,
  earseDelay: 20
  }}
/>
    </div>
    <button onClick={handleAuth} className="text-white flex shadow-2xl shadow-[#915EFF] rounded-md p-4 mx-auto">
        <img 
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="google_icon"
        className="w-8"/>
        <p className="mt-1 mx-2">Continue with Google</p></button>
    <img
    src='https://cdn3d.iconscout.com/3d/premium/thumb/crypto-exchange-5142134-4298247.png?f=webp'
    alt="crpto_img"
    className="mx-auto w-96 mt-20"/>
   </div>
  )
}

export default Auth