import React, { useEffect, useState } from 'react';
import dataset from './components/common/data.json';


const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataset);
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-12">System Data</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{item.description}</p>

              <div className="space-y-1 text-xs pt-4 border-t border-slate-50">
                <p className="text-slate-400">Age: <span className="text-slate-700 font-bold">{item.age}</span></p>
                <p className="text-slate-400">Address: <span className="text-slate-700 font-bold">{item.address}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
