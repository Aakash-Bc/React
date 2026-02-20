import React, { useEffect, useState } from 'react';
import dataset from './components/common/data.json'; 

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataset); 
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center mt-16 px-4">
   
      <h1 className="text-5xl font-bold text-slate-900">
        Hello,<span className="text-indigo-700"> i am from the Data Component</span>
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" >Search</button>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 w-full max-w-[1200px]">
        {data?.map((item) => (
          <div 
            key={item.id} 
            className="bg-blue-300 rounded-lg p-6 shadow-lg hover:scale-105 transform transition duration-300 text-center"
          >
            <h2 className="text-black-800 font-bold mb-2 ">{item.name}</h2>
            <p className="text-slate-800 mb-1">Age: {item.age}</p>
            <p className="text-slate-800">Address: {item.address}</p>
            <p className="text-slate-700 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Data;
