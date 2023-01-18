import React from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { useGlobalContext } from '../context/GlobalContext'
const ToggleButton = () => {
    const { isOpen, handleOrderSidebar }  =useGlobalContext()
    return (
      <button onClick={handleOrderSidebar}>
      <div className=' z-50 top-[70%] left-[80%] shadow-2xl  my-2 fixed flex flex-col justify-center items-center text-white w-12 h-12 bg-orange-600 rounded-full md:hidden '>
      <div className='transition-all duration-700 delay-100'>
      { isOpen ?<div><RxCross2 className='text-xl'/></div>:   <div className='m-0'>
          <IoIosArrowUp className=' text-xl  '/>
          <IoIosArrowDown className=' text-xl  '/>
          </div>}
          </div>
          
          
      </div>
  </button>
    )
  }
  

export default ToggleButton