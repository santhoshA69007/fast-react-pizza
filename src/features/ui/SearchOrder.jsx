
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchOrder() {
    const [query,setQuery]=useState()
    const navigate=useNavigate()
function handleSubmit(e) {
    e.preventDefault()
    if(!query) return

    navigate(`order/${query}`)
    setQuery("")

    
}

    return <form onSubmit={handleSubmit}>

                   <input className="sm:w-64 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-40 rounded-full px-4 py-2 bg-yellow-100 text-sm placeholder:text-stone-400  " placeholder="Search Order " value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </form>  

}
export default SearchOrder
