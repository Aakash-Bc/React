import { useState, useEffect } from 'react'
import userData from './components/common/data.json'

export const UserData = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setUsers(userData)
        setLoading(false)
    }, [])

    return (
        <div className="min-h-screen bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-slate-900 mb-12">User Directory</h1>

                {loading ? (
                    <div className="text-slate-400 font-medium">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {users.map((user, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="font-bold text-slate-900">{user.name}</h3>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-500">Age: <span className="text-slate-900 font-medium">{user.age}</span></p>
                                    <p className="text-slate-500">ID: <span className="text-slate-900 font-medium">{user.id}</span></p>
                                    <p className="text-slate-500">Address: <span className="text-slate-900 font-medium">{user.address}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserData