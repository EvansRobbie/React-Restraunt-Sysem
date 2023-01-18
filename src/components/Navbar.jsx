import React, {useState} from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai'
import { BsFillCartFill}  from 'react-icons/bs'


const Navbar = () => {
    const {isActive, handleOrderSidebar, isClicked,itemQuantity, deliveryPickup, submit,status,setSearch } = useGlobalContext()
    // console.log(submit[1])
    const [nav, setNav] = useState(false)
    const [completeOrder, setCompleteOrder] = useState(false)
    
    

    const handleMenu = () =>{
        setNav(!nav)
    }
    const handleCompleteOrder = () =>{
        setCompleteOrder(!completeOrder)
    }
    const submitElement = submit?.map((item)=>(
        <tr key={item.id} className='text-black border-b overflow-hidden'>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td className=' text-green-500'>{status}</td>
        </tr>))
    const completeElement = submit?.map((item)=>(
        <tr key={item.id} className='text-black border-b overflow-hidden'>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td className=' text-green-500'>{26 * item.quantity * submit.length}</td>
    </tr>))
    
  return (
    <div className={`${isActive ? 'bg-white py-4 shadow-md  px-2' : 'bg-black/10 p-6 text-white' } fixed w-full max-w-[1640px] mx-auto flex items-center justify-between z-20 py-6 md:px-12`}>
        {/* Left Side */}
        <div className='flex items-center '>
            <div onClick={handleMenu} className=' cursor-pointer'>
                <AiOutlineMenu size={30}/>
                <div className='bg-orange-600 absolute sm:left-10 md:left-16 top-6 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{submit.length}</div>
            </div>
            <h1 className='capitalize text-2xl sm:text-3xl lg:text-4xl px-2'>Classic <span className='font-bold'>Pizza</span></h1>
            <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px] ' onClick={deliveryPickup}>
                <p className={`${isClicked ? 'bg-black text-white' : 'text-black'}  rounded-full p-2 scroll-smooth transition duration-300`}>Delivery</p>
                <p className={`${isClicked ? 'text-black' : 'bg-black text-white'} rounded-full p-2 `}>Pickup</p>
            </div>
            
        </div>
        {/* Searc input */}
        <div className={`${isActive ? 'sm:w-[100px]': 'sm:w-[400px]'} flex items-center bg-gray-200  text-black rounded-full px-2  lg:w-[500px]`}>
            <AiOutlineSearch size={20}/>
            <input onChange={(e) => setSearch(e.target.value)} className='bg-transparent w-full p-2 focus:outline-none ' type='text' placeholder='Search Pizza' />
        </div>
        {/* cart */}
        <button onClick={handleOrderSidebar} className={` ${isActive ? 'bg-black text-white' : 'bg-white text-black' } hidden md:flex items-center py-2 rounded-full`}>
            <BsFillCartFill size={20} className='mr-2'/> Orders
            <div className='bg-orange-600 absolute right-24 top-6 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemQuantity}</div>
        </button>

        {/* Mobile Menu */}
        {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0 duration-300'></div>:''}
       
        {/* Sidedrawer Menu */}
        <div className= {` ${ nav ? 'left-0' : '-left-full'} fixed left-0 top-0 w-full md:w-[500px]  h-screen bg-white z-10  duration-700 `}>
            <AiOutlineClose onClick={handleMenu} size={25} className= 'text-black absolute right-4 top-4 cursor-pointer' />
            <h2 className= 'text-black text-2xl p-4'>Submitted<span className=' font-bold'> Order({submit.length})</span></h2>
            {/* <nav>
                <ul className='text-gray-800 p-4'>
                    <li className=' text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4'/> Orders</li>
                    <li className=' text-xl py-4 flex'><MdFavorite size={25} className='mr-4'/> Favorites</li>
                    <li className=' text-xl py-4 flex'><FaWallet size={25} className='mr-4'/> Wallet</li>
                    <li className=' text-xl py-4 flex'><MdHelp size={25} className='mr-4'/> Help</li>
                    <li className=' text-xl py-4 flex'><AiFillTag size={25} className='mr-4'/> Promotions</li>
                    <li className=' text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4'/> Best Ones</li>
                    <li className=' text-xl py-4 flex'><FaUserFriends size={25} className='mr-4'/> Invite Friends</li>
                </ul>
            </nav> */}
            
                <table className='w-full border-collapse text-center text-black'>
                    <thead >
                        <tr className='border-b'>
                        <th>Order name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submitElement}
                    </tbody>
                    {/* <div>{status}</div> */}
                </table>
                {/* {status} */}
            
            <div onClick={handleCompleteOrder}  className={`${nav ? '': '-left-full'}bg-orange-600 p-4 mt-6 flex justify-center items-center rounded-2xl shadow-xl ml-10 hover:shadow-2xl hover:scale-105 cursor-pointer max-w-[300px] ease-in duration-300 text-white w-full font-medium`}>View Completed Orders</div>
            <h2 className='text-xl text-orange-600 text-center font-semibold py-8'>Completed Orders</h2>
            {completeOrder ?
             <table className='w-full border-collapse text-center text-black'>
                    <thead >
                        <tr className='border-b'>
                        <th>Order name</th>
                        <th>Quantity</th>
                        <th>Total Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeElement}
                    </tbody>
                    {/* <div>{status}</div> */}
                </table>  : <p className='text-black text-center text-base font-semibold'>Click to show complete order</p>}
        </div>

    </div>
  )
}

export default Navbar