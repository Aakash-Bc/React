import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import Navbar from './Navbar'
import TodoList from './Todolist'
import { Hello } from './Hello'
import { ProductLists } from './ProductLists'
import { Route, Routes } from 'react-router-dom'
import { DetailPage } from './DetailPage'
import { UserLists } from './modules/users/UserLists'
import Home from './Home'
import News from './News'
import ButtonDemo from './components/ButtonDemo'

function App() {
    // let count = 0

    const [count, setCount] = useState(0) //number
    const [color, setColor] = useState("gray") //string
    const [user, setUser] = useState({
        name: 'riwaj',
        age: 18
    })  //object


    const [numbers, setNumbers] = useState([1, 2, 4, 45, 5]) //array
    const [value, setValue] = useState(null) // null
    const [show, setShow] = useState(false) //bolean
    const [showName, setShowName] = useState(false) //bolean



    return (
        <div className="flex flex-col min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='products' element={<ProductLists />} />
                    <Route path='news' element={<News />} />
                    <Route path='news/:category' element={<News />} />
                    <Route path='users' element={<UserLists />} />
                    <Route path='products/:id' element={<DetailPage />} />
                    <Route path='todolist' element={<TodoList />} />
                    <Route path='buttons' element={<ButtonDemo />} />
                    <Route path="/*" element={<div className="min-h-[60vh] flex items-center justify-center"><h1 className="text-4xl font-bold text-slate-800">Page not found</h1></div>} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}

export default App