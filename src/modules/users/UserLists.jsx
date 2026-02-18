import { useEffect, useState } from "react"

export const UserLists = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://randomuser.me/api/?results=12&seed=abc`)
            const data = await response.json()
            setUsers(data.results)
        } catch (error) {
            console.error("Error fetching users:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
            <div className="flex justify-between items-center border-b pb-6">
                <h1 className="text-2xl font-bold text-slate-900">User List</h1>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                />
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500 font-medium">Loading user directory...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map((user, index) => (
                        <div key={index} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col items-center space-y-4">
                                <img
                                    src={user.picture.medium}
                                    alt={user.name.first}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-100"
                                />
                                <div className="text-center">
                                    <h3 className="font-bold text-slate-900 leading-tight">
                                        {user.name.first} {user.name.last}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-1">{user.email}</p>
                                    <p className="text-sm text-slate-400 mt-1">{user.phone}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}