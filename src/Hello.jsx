import { useState } from "react"
import { Card } from "./Card"

export const Hello = () => {
    const [team, setTeam] = useState([
        { id: 1, name: "Riwaj", skills: "Full Stack Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=riwaj" },
        { id: 2, name: "Asal", skills: "React Specialist", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=asal" },
        { id: 3, name: "Anuj", skills: "UI/UX Designer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=anuj" },
        { id: 4, name: "Akash", skills: "DevOps Engineer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=akash" }
    ])

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-slate-900">Meet Our <span className="text-blue-600">Expert Team</span></h1>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium">Coming together is a beginning. Keeping together is progress. Working together is success.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                    <Card key={member.id} item={member} />
                ))}
            </div>
        </div>
    )
}
