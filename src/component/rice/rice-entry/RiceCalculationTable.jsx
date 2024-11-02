import moment from 'moment';
import React from 'react';

// eslint-disable-next-line react/prop-types
const RiceCalculationTable = ({ totalPot, riceList }) => {

  return (
    <div className='my-10'>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Total Calculation</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4 border-b border-gray-300">#</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300">Pot Rice</th>
              <th className="py-2 px-4 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {riceList && riceList.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b border-gray-300">{i + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item?.borderData?.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <img src= {item?.borderData?.img} alt="Border" className="w-12 h-12 rounded-full block mx-auto" />
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{item?.totalPot || 0}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {item?.date ? moment(item.date).format('MMMM Do YYYY') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-center">
          {totalPot !== undefined && <p>Total Pot Rice: {totalPot}</p>}
        </div>
      </div>
    </div>
  );
};

export default RiceCalculationTable;
