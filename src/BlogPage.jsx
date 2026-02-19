import { useState, useEffect } from 'react'

const BlogPage = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")

    const deleteData = () => {
        localStorage.removeItem("Name")
        localStorage.removeItem("Age")
        localStorage.removeItem("City")
        // Clear state so the UI updates immediately
        setName("")
        setAge("")
        setCity("")
    }

    useEffect(() => {
        localStorage.setItem("Name", "Aakash")
        localStorage.setItem("Age", "18")
        localStorage.setItem("City", "Kathmandu")

        const storedName = localStorage.getItem("Name")
        const storedAge = localStorage.getItem("Age")
        const storedCity = localStorage.getItem("City")

        // Use the correct setter for each variable
        setName(storedName)
        setAge(storedAge)
        setCity(storedCity)
    }, [])

    return (
        <div>
            <h1>Name: {name}</h1>
            <h1>Age: {age}</h1>
            <h1>City: {city}</h1>
            <button onClick={deleteData}>Delete</button>
        </div>
    )
}

export default BlogPage