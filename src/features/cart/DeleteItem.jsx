/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import Button from "../ui/Button"
import { deleteItem } from "./cartSlice"





function DeleteItem({children,pizzaId}) {
    const dispatch=useDispatch()
    
    return <Button onClick={()=>dispatch(deleteItem(pizzaId))} type="small">{children}</Button>
 
    

}



export default DeleteItem
