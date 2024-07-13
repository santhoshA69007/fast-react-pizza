/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUserName } from "../User/userSlice";
import EmptyCart from "./EmptyCart"


function Cart() {
  const cart = useSelector(getCart);
  const username=useSelector(getUserName);
  const dispatch=useDispatch()
  if(!cart.length)return <EmptyCart/>
  return (
    <div className="px-4 py-3">
      <LinkButton
        to={"/menu"}
        className="text=sm text-blue-500 hover:text-blue-600 hover:underline"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart,{username}</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={()=>dispatch(clearCart())} type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
