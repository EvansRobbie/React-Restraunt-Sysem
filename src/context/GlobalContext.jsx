import React, {useState, useEffect, createContext, useContext} from 'react'
import toast from 'react-hot-toast'

const GlobalContext = createContext()
const GlobalContextProvider = ({children}) => {
     // cart state 
     const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order'))|| [])
     // cart SideBAr open or closed
     const [isOpen, setIsOpen] = useState(false)
     // scroll state
     const [isActive, setIsActive] = useState(false)
     // deliverly and pickup state
    const [isClicked, setIsClicked] = useState(false)

    const [itemQuantity, setItemQuantity] = useState(0)
    // total price state
    const [total, setTotal] = useState(0)
    // submit order State
    const [submit, setSubmit] = useState(JSON.parse(localStorage.getItem('submit')) ||[])
    const [isSub, setIsSubmit] = useState(false)
    // status
    const [status, setStatus] = useState('')
    // Time taken for order to be completed
    const [countDown, setCountDown] = useState(26)
    const [isEmpty, setIsEmpty] =useState('No order Items')
    // search State
    const [search, setSearch] = useState('')
     
    const OrderItem = (pizza, id) =>{
        //  console.log(pizza)
         const newItem = {...pizza, quantity:1}

         // check if item already ordered
         const OrderItem = order.find((item) => item.id === id)
        
         if (OrderItem){
              // if item already exist in order increase quantity
              const newOrder = [...order].map((item) =>{
                 if (item.id ===id){
                     return {...item, quantity:OrderItem.quantity+1}
                 }else{
                     return item
                 }
              })
              setOrder(newOrder)
              toast.success('Pizza QTY Increased')
              
         }else{
             const newOrder = [...order, newItem]
             setOrder(newOrder)
             toast.success(`${pizza.name} Pizza Ordered`)
         }
         
       
     }
     const handleDescription = () =>{
        toast.success('No Order description')
     }


    const handleOrderSidebar = () =>{
        setIsOpen(!isOpen)
        // console.log(isOpen)
    }
    // handle delivery and pickup event
    const deliveryPickup =() =>{
        setIsClicked(!isClicked)
    }
    const removeFromOrders = (id) =>{
        const newOrder = order.filter((item) => item.id !== id)
        // console.log(newCart)
        setOrder(newOrder)
        toast.success('Item Removed from Cart')
   }

    // increase quantity
    const increaseQuantity = (id) =>{
        const orderItem = order.find((item) => item.id === id)
        OrderItem(orderItem, id)
        
    }
    // decrease quantity
   const decreaseQuantity = (id) => {
        const orderItem = order.find((item) => item.id === id)
        if (orderItem){
            const newOrder = order.map((item) =>{
                if (item.id === id){
                    return {...item, quantity:orderItem.quantity -1}
                }else{
                    return item
                }
            })
            setOrder(newOrder)
        }
        if (orderItem.quantity < 2){
            removeFromOrders(id)
        }
   }
    //    clear all items in cart
    const clearOrder = () =>{
        setOrder([])
        toast.success('Order Cleared')
    }

    const submitOrder = () =>{
        setIsSubmit(!isSub)
        setSubmit(order)
        setStatus('')
        setIsEmpty('Order submitted Successfully')
        setOrder([])
        toast.success('Order Submitted Succefully')
        // TotalTime()
        // console.log(order)
    }
    // Update items quantity
    useEffect (()=>{
        if(order){
            const quantity = order.reduce((accumulator, currentItem) =>{
                return accumulator + currentItem.quantity
            }, 0)
            setItemQuantity(quantity)
        }
    }, [order])
    // Total Price
    useEffect(()=>{
        if(order){
            const total = order.reduce((accumulator, currentItem) =>{
                return accumulator + currentItem.quantity * currentItem.price
               
            }, 0)
            setTotal(total)
        }
    },[order])
    // make the navbar change on scroll
    useEffect (() =>{
        window.addEventListener('scroll', () =>{
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
        })
    })
//    Local Storage
    useEffect (() =>{
        localStorage.setItem('order', JSON.stringify(order))
        localStorage.setItem('submit', JSON.stringify(submit))
    },[order, submit])
    // status Effect
    useEffect(()=>{
        if(isSub === true && countDown > 0 ){
            setTimeout(() =>{
                setCountDown(prevCount => prevCount -1)
            
                
                    submit.map((item) => {
                        const totalTime = 26 * item.quantity
                        const doughTime = totalTime- 7 *item.quantity
                        const toppingTime = doughTime - 4* item.quantity
                        const ovenTime = toppingTime - 10 * item.quantity
                        const waiterDelivery = ovenTime - 5* item.quantity
                        if (countDown <= (totalTime)){
                            
                            setStatus('In preparation')
                            // console.log(countDown)
                        }if(countDown <= doughTime){
                            setStatus('adding toppings')
                            // console.log(countDown)
                        }
                         if(countDown <= toppingTime){
                            
                            setStatus('Almost There')
                        }
                        if(countDown <= waiterDelivery){
                            // console.log(countDown)
                            setStatus('Pending Delivery')
                            }
                    return countDown
                }
                
                    )
                
            },1000)
        }
        else if (countDown===0 ){
            setStatus('order Completed')
        }
        
    },[countDown,isSub, submit])
  return (
    <GlobalContext.Provider value={{isOpen,
    order,
    total,
    isActive,
    deliveryPickup,
    handleOrderSidebar,
    OrderItem,
    clearOrder,
    decreaseQuantity, 
    increaseQuantity,
    itemQuantity, 
    removeFromOrders,
    submitOrder,
    submit,
    status,
    isEmpty,
    search, 
    setSearch,
    handleDescription
      }}>
        {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}

export default GlobalContextProvider