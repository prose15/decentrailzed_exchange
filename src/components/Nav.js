import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';

const Nav = () => {
    const cookie = new Cookies()
    const nav = useNavigate()
    const handleSignOut = () =>{
      signOut(auth).then(() => {
      cookie.remove("auth-token")
      nav('/login')
      }).catch((error) => {
        console.log(error);
      });
    }
  return (
    <nav className='flex justify-between items-center mx-12'>
    <div className='flex justify-evenly items-center '>
    <img
    src='https://static.vecteezy.com/system/resources/previews/013/391/079/original/cryptocurrency-exchange-3d-illustration-free-png.png'
    alt='logo'
    className='w-20'/>
    <Link to={'/transcation-history'} className='tex-xl text-white mx-8 cursor-pointer hover:border-b-4 border-pink-200' >Transaction History</Link>
    </div>
   <div>
    <p className='text-xl text-white cursor-pointer' onClick={handleSignOut}>Logout</p>
   </div>
</nav>
  )
}

export default Nav