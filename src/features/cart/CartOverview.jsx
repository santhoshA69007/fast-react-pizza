
import { useSelector } from "react-redux";
import LinkButton from "../ui/LinkButton";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../utils/helpers";

function CartOverview() {
const totalCartQuantity=useSelector(getTotalCartQuantity);
const totalCartPrice=useSelector(getTotalCartPrice);
if(!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-4 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <LinkButton to={"/cart"}>Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
