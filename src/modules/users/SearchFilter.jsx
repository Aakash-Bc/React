import { useState } from "react";

function SearchFilter() {
  const [search, setSearch] = useState("");

  const products = [
    "Laptop",
    "Mobile",
    "Keyboard",
    "Mouse",
    "Monitor",
  ];

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product..."
        className="border p-3 w-full rounded"
      />

      <div className="mt-4 space-y-2">
        {filteredProducts.map((product) => (
          <div
            key={product}
            className="p-3 bg-gray-100 rounded"
          >
            {product}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;