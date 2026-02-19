import { useState, useEffect } from 'react'
import userData from './components/common/data.json'

export const UserData = ()=>{
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setUsers(userData)
        setLoading(false)
    }, [])
    return(
        <div className="max-w-7xl mx-auto px-6 py-12">
            {loading ? (
                <div className="text-center py-20 text-slate-500 font-medium">Loading user directory...</div>
            ) : (   
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user, index) => (
                        <div key={index} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">    
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>  
                                <div className="text-center">
                                    <h3 className="font-bold text-slate-900 leading-tight">
                                        {user.name}
                                    </h3>
                                    <p className="text-sm text-slate-900 mt-2">Age: {user.age}</p>
                                    <p className="text-xs text-slate-900 mt-1">ID: {user.id}</p>
                                    <p className='text-xs text-slate-900 mt-2'>Address: {user.address}</p>
                                </div>
                            </div>
                        </div>  
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserData