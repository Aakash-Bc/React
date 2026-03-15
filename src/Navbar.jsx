import { Link } from "react-router-dom"
import RandomText from "../RandomText"

// import RandomText from "../RandomText"
import Button from "./components/common/Button"

function Navbar() {
    return (
        <>

            <div className="flex justify-between items-center px-16 py-8 bg-slate-100 shadow-sm">

                <div>
                    <Link to="/" className="text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Logo
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Home</Link>
                    <Link to="products" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Products</Link>
                    <Link to="news" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">News</Link>
                    <Link to="users" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Users</Link>
                    <Link to="todolist" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">TodoList</Link>
                    <Link to="userData" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">UserData</Link>
                    <Link to="BlogPage" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Blog</Link>
                    <Link to="data" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Data</Link>
                    <Link to="/backend" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Backend Blog</Link>
                    <Link to="/admin" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Admin</Link>
                    <Link to="contact" className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors">Contact</Link>
                </div>
                <div className="flex gap-4">
                    {/* Login/Signup removed per user request */}
                </div>
            </div>
        </>
    )
}

export default Navbar