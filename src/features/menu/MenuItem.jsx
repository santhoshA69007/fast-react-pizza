/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { formatCurrency } from "../utils/helpers";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  // eslint-disable-next-line no-unused-vars
const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
const dispatch=useDispatch()

const currentQuantity =useSelector(getCurrentQuantityById(id))
console.log(currentQuantity)

const isInCart=currentQuantity>0;
console.log(isInCart)
 function handleAddToCart() {
 const newItem= {
  pizzaId:id,
  name:name,
  quantity:1,
  unitPrice:unitPrice,
  totalPrice:unitPrice*1
}
dispatch(addItem(newItem));
  
 }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow ">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase text-sm  font-medium text-stone-500">
              Sold out
            </p>
          )}
          {isInCart &&<div className="flex item-center gap-3 sm:gap-8">
          <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
          <DeleteItem onClick={()=>dispatch(deleteItem(id))} key={id} pizzaId={id}> Delete </DeleteItem>
          
          
           </div> }

          {!soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
