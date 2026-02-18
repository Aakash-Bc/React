import { Link } from "react-router-dom"
import RandomText from "../RandomText"

// import RandomText from "../RandomText"
import Button from "./components/common/Button"

function Navbar() {
    return (
        <>

            <div className="flex justify-between items-center px-16 py-8 bg-slate-100 shadow-sm">

                <div>
                    <Link to="/" className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Logo</Link>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                    <Link to="products" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Products</Link>
                    <Link to="news" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">News</Link>
                    <Link to="users" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Users</Link>
                    <Link to="todolist" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">TodoList</Link>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                    <Link to="/signup" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar