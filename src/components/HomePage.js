import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie'

const HomePage = () => {
    const cookies = new Cookies()
    const name =  cookies.get('name')
 console.log(name);
    const [coin1,setCoin1] = useState()
    const [coin2,setCoin2] = useState()
    const [amount, setAmount] = useState('')
    const [result, setResult] = useState([])
    const [history,setHistory] = useState([])
    const dbRef = collection(db,'transcations')
    useGSAP(()=>{
        gsap.to('#hero', { opacity:1, y:-50 , delay:1})
    },[])

    useEffect(()=>{
      const handleCalculate = async() =>{
        const data = await fetch(`https://rest.coinapi.io/v1/exchangerate/${coin1}/${coin2}`, {
            headers: {
              'X-CoinAPI-Key': 'B7513771-2565-4659-903B-EC96B657BF26'
            }
          })
        const response = await data.json()
        setHistory(response)
        const rate = response.rate;
        const converstion_rate = (parseFloat(amount) * rate).toFixed(2)
        setResult(converstion_rate)
    }
    handleCalculate()
    },[amount])
const handleSwap = async () =>{
  if(amount === ''){
    toast.error('Please enter the amount of to be swapped')
  }
  else{
    await addDoc(dbRef , {
      name : name,
      histories : history,
      amount : amount,
      result : result,   
    })
  toast.success('Successfully swapped . Check in Transcation History')
  }
  }
  return (
    <div className='bg-[#050816] h-screen'>
    <Nav/>
    <div className='flex flex-col my-20 justify-center items-center'>
    <p id='hero' className='opacity-0 text-3xl text-white font-bold cursor-pointer'>Hello {name}, welcome to decentralized exchange</p>
    <div className='bg-gray-800 p-8 rounded-lg shadow-[#915EFF] shadow-2xl'>
    <p className='text-white'>No of coins to be exchange</p>
    <div className='flex p-8 rounded-md my-4 bg-black shadow-sm shadow-[#915EFF]'>
      <input type='number' value={amount} className='bg-black text-white border border-black' placeholder='0.0' onChange={(e)=>setAmount(e.target.value)}/>
      <select id='coins1' className='p-2 rounded-md  opacity-50 bg-gray-400' onChange={(e)=>setCoin1(e.target.value)}>
      <option value=''>select coin</option>
        <option value='BTC'>BITCOIN</option>
        <option value='ETH'>ETHEREUM</option>
        <option value='DAI'>DAI</option>
        <option value='USD'>USD</option>
      </select>
    </div>
    <p className='text-white'>What you will get</p>
    <div className='flex p-8 rounded-md my-4 bg-black shadow-sm shadow-[#915EFF]'>
      <input type='number' value={result} className='bg-black text-white border border-black' placeholder='0.0'/>
      <select id='coins2' className='p-2 rounded-md opacity-50 bg-gray-400' onChange={(e)=>setCoin2(e.target.value)}>
        <option value=''>select coin</option>
        <option value='BTC'>BITCOIN</option>
        <option value='ETH'>ETHEREUM</option>
        <option value='DAI'>DAI</option>
        <option value='USD'>USD</option>
      </select>
    </div>
    <div className='text-center'>
    <button className=' p-4 rounded-lg text-pink-500 border border-pink-500 shadow-lg shadow-pink-500 hover:bg-pink-500 hover:text-white' onClick={handleSwap}>Swap</button>
    <Toaster/>
    </div>
    </div>  
    </div> 
</div>
  )
}

export default HomePage