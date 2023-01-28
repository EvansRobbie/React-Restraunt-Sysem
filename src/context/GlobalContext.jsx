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
    const [finishedOrders, setFinishedOrders] = useState(JSON.parse(localStorage.getItem('finishedOrders')) || [])
    const [isSub, setIsSubmit] = useState(false)
    const [isEmpty, setIsEmpty] =useState('No order Items')
    // search State
    const [search, setSearch] = useState('')

  
const startPreparingOrder = (order) => {
    const updatedOrder = { ...order, status: 'preparing dough', timing: order[0].timing.dough = 7};
    // Update the dough timing
    // console.log(order[0].toppings.split(',').length)
    setFinishedOrders([...finishedOrders, updatedOrder]);
    setTimeout(() => {
      // simulate dough preparation
      const updatedOrder = { ...order, status: 'preparing toppings', timing:order[0].timing.toppings = 4 * order[0].toppings.length  };
      setFinishedOrders([...finishedOrders, updatedOrder]);
      setTimeout(() => {
        // simulate topping preparation
        const updatedOrder = { ...order, status: 'cooking in oven', timing:order[0].timing.oven = 10 };
        setFinishedOrders([...finishedOrders, updatedOrder]);
        setTimeout(() => {
          // simulate oven cooking
          const updatedOrder = { ...order, status: 'serving order' };
          setFinishedOrders([...finishedOrders, updatedOrder]);
          setTimeout(() => {
            // simulate waiter serving
            const updatedOrder = { ...order, status: 'finished', timing:order[0].timing.total = order[0].timing.dough + order[0].timing.toppings + order[0].timing.oven + 5 * order[0].quantity  };
            // console.log(updatedOrder)
            setFinishedOrders([...finishedOrders, updatedOrder]);
            // remove the order from the current orders
            // setFinishedOrders(finishedOrders.filter((o) => o.id !== order.id));
            
          }, 5000);
        }, 10000);
      }, 4000 * order[0].toppings.split(',').length);
    }, 7000);
    setIsSubmit(!isSub)
    // setFinishedOrders(order)
    // setStatus('')
    setIsEmpty('Order submitted Successfully')
    setOrder([])
    toast.success('Order Submitted Succefully')
  };
  const removeOrder= (id) =>{
    const newFinishedOrder = finishedOrders.filter((item) => item.id !==id)
    setFinishedOrders(newFinishedOrder)
    
  }
 
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
        localStorage.setItem('finishedOrders', JSON.stringify(finishedOrders))
    },[order, finishedOrders])
   
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
    finishedOrders,
    isEmpty,
    search, 
    setSearch,
    handleDescription,
    startPreparingOrder,
    removeOrder
      }}>
        {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}

export default GlobalContextProvider