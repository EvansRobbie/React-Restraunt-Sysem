import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { IoMdArrowForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'
import OrderItems from './OrderItems'


const Orders = () => {

    const {isOpen,handleOrderSidebar, order,total, startPreparingOrder, clearOrder,itemQuantity,isEmpty} = useGlobalContext()
    const OrderElement = order.map((item) =>{
        return(
            <OrderItems key={item.id} item = {item}/>
        )
    })
  return (
    <>
    {isOpen ? <div className=' bg-black/80 w-full h-screen fixed top-0 left-0 z-10 duration-700'></div>: ''}
    <div className={`${isOpen ? 'right-0' : '-right-full'} w-full h-full top-0  z-20 fixed bg-white shadow-2xl md:max-w-[35vw] xl:max-w-[30vw] duration-700 px-3 lg:px-[35px]`}>
        <div className='flex justify-between items-center border-b py-6'>
            <div className='uppercase font-semibold text-sm'>Orders({itemQuantity})</div>
            <div onClick={handleOrderSidebar} className='flex justify-center items-center w-8 h-8 cursor-pointer'>
                <IoMdArrowForward size={25}/>
            </div>
        </div>
        {/* cart items */}

       { order.length > 0 ? <div className='flex flex-col gap-y-2 h-[320px] lg:h-[350px] overflow-y-auto overflow-x-hidden border-b'>
            {OrderElement}
        </div>: <p className='font-bold text-xl text-center py-6'>{isEmpty}</p>}
        <div className='flex flex-col gap-y-3 py-4 mt-4'>
            <div className='w-full flex justify-between items-center'>
                {/* total */}
                <div className='uppercase font-bold text-sm'>
                    <span className='mr-2'>Total:</span>$ {total}
                </div>
                {/* clear cart */}
                <div onClick={clearOrder} className='cursor-pointer py-4 bg-orange-600 rounded-full text-white w-12 h-12 flex justify-center items-center'>
                    <FiTrash2/>
                </div>
            </div>
        </div>
        {}
        <div onClick={()=>startPreparingOrder(order)} className='bg-orange-600 p-4 flex justify-center items-center rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer ease-in duration-300 text-white w-full font-medium'>Submit order</div>
    </div>
    </>
  )
}
export default Orders