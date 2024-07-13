/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../ui/Button";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../utils/helpers";
import { fetchAddress } from "../User/userSlice";

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const dispatch=useDispatch()
 const cart =useSelector(getCart)
 const totalCartPrice=useSelector(getTotalCartPrice);
 const priorityPrice=withPriority?totalCartPrice*0.2:0;
 const totalPrice=totalCartPrice+priorityPrice;
 const{username,status:addressStatus,position,address}=useSelector((state)=>state.user);
 const isLoadingAddress=addressStatus==="loading";

 if(!cart.length)return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-semibold">Ready to order? Lets go!</h2>
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>
  
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {/* {formErrors?Button.phone &&(<p cla ssName="mt-2 bg-red-100 text-xs text-red-700 p-2 rounded-full"></p>):""} */}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
  <label className="sm:basis-40">Address</label>
  <div className="grow">
    <input
      className="input w-full"
      type="text"
      name="address"
      required
      disabled={isLoadingAddress}
      defaultValue={address}
    />
    <input
      className="input"
      type="hidden"
      name="cart"
      value={JSON.stringify(cart)}
    />
  </div>
</div>

{!position.latitude && <span className="absolute right-[3px] z-50">

       <Button type="small" disabled={isLoadingAddress} onClick={(e)=>{
        dispatch(fetchAddress())
        e.preventDefault();
        }}>Get Postion</Button>
</span>}


        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" isSubmitting={isSubmitting}>
            {isSubmitting ? "placing order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
