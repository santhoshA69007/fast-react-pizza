/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Button({ children, isSubmitting, type, to,onClick }) {
  const base =
    "text-sm bg-yellow-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transtion-colors duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "py-2 px-4 md:px-5 md:py-2.5 text-xs",
    round:base + "py-1 px-2.5 md:px-3.5 md:py-2 text-sm",
    secondary:
      "text-sm bg-stone-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-stone-300 transtion-colors duration-300 focus:bg-stone-300 focus:outline-none focus:ring focus:stone-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed  border-2 border-stone-300 px-4 py-3 md:px-6 md:py-4",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if(onClick){
    return <button onClick={onClick} className={styles[type]} disabled={isSubmitting}>

      {children}

    </button>
  }
  

  return (
    <button className={styles[type]} disabled={isSubmitting}>
      {children}
    </button>
  );
}

export default Button;
