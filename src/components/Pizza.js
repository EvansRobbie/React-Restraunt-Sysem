import React from 'react'
import { BsEyeFill, BsPlus } from 'react-icons/bs'
import PizzaData from '../PizzaData'
import { useGlobalContext } from '../context/GlobalContext'
import ToggleButton from './ToggleButton'



const Pizza = () => {

 const {OrderItem, search,handleDescription} = useGlobalContext()
 

  return (
    <div className='max-w-[1640px] mx-auto px-10 py-10'>
        <h1 className='text-orange-600 font-bold text-4xl text-center capitalize pb-4'>Top rated menu items</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4'>
            {/* Display Products/Food */}
            {PizzaData.filter((value)=>{
                 if (search === ''){
                    return value
                } else if( value.name.toLowerCase().includes(search.toLowerCase())) {
                    return value    
                }
                return false;
            }).map((pizza) =>{
                const {id, name, image, price,toppings} = pizza
                return (
                    <div key={id} className='relative group border shadow-lg hover:scale-105 duration-300 rounded-lg cursor-pointer'>
                        <img className='w-full h-[200px] object-cover rounded-t-lg ' src={image} alt={name} />

                        <div className='flex justify-between  px-2 py-4'>
                            <p className='font-bold'>{name}</p>
                            <p>
                                <span className=' bg-orange-500 text-white rounded-full p-1'>${price}</span>
                            </p>
                        </div>
                        <div className='absolute  w-full h-full group-hover:bg-black/60 rounded-xl text-white bg-transparent top-0 left-0 duration-300'/>
                        <div className='px-2 left-0 absolute opacity-0 group-hover:opacity-100
                                transition-all duration-300 -bottom-11 group-hover:bottom-6 z-10 pb-5'>
                            <p className='font-semibold leading-[1.3] text-gray-300'>Toppings:<span className='ml-2 font-bold text-base'>{toppings}</span></p>
                        </div>
                        
                        <div>
                            {/* buttons */}
                            <div className=' absolute top-6 p-2 flex flex-col justify-center items-center  opacity-0 group-hover:opacity-100
                                transition-all duration-300 -right-11 group-hover:right-5 '>
                                    <button className=' border-none flex flex-col gap-y-2'>
                                        {/* TODO: Add onClick event */}
                                        <div onClick={()=> OrderItem(pizza, id)}  className='flex justify-center items-center rounded-full text-white w-12 h-12 bg-orange-600'>
                                            <BsPlus size={25}/>
                                        </div>
                                        <div onClick={handleDescription} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full'>
                                            <BsEyeFill />
                                        </div>
                                    </button>
                                </div>
                                </div>
                    </div>
                )
            })}
        </div>
       <ToggleButton/>
    </div>
  )
}

export default Pizza