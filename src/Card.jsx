export const Card = ({ item }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group text-center space-y-4">
      <div className="relative inline-block">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-slate-50 group-hover:border-blue-50 transition-colors"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
          {item.skills}
        </p>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">
        Passionate professional dedicated to delivering high-quality digital experiences.
      </p>
    </div>
  )
}