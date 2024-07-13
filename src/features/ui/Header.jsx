import UserName from "../User/UserName";
import SearchOrder from "./SearchOrder";
import LinkButton from "./LinkButton";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 uppercase px-4 py-3 border-b-1 border-stone-500 font-pizza">
      <LinkButton to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </LinkButton>
  
      <SearchOrder/>

        <UserName />
   
    </header>
  );
}

export default Header;
