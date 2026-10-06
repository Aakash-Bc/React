function Card({ title, description, image }) {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl border bg-white shadow-lg">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-2 text-gray-600">
          {description}
        </p>

        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Card;