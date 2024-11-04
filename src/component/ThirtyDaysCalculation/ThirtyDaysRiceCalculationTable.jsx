/* eslint-disable react/prop-types */
import moment from 'moment';

const ThirtyDaysRiceCalculationTable = ({totalEatenRiceOneBorder,totalGivenRiceOneBorder,borderData,chalPabane,millQrImg}) => {
  
  return (
    <div>
      <div className="my-10">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Total Calculation</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-4 border-b border-gray-300">#</th>
                <th className="py-2 px-4 border-b border-gray-300">Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Image</th>
                <th className="py-2 px-4 border-b border-gray-300">Money</th>
                <th className="py-2 px-4 border-b border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {borderData && borderData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b border-gray-300">{i + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item?.borderData?.name || 'Unknown'}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <img
                      src={item?.borderData?.img || '/default-image.jpg'}
                      alt={item?.borderData?.name ? `${item.borderData.name} Image` : 'No image available'}
                      className="w-12 h-12 rounded-full block mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">{item?.totalMoney || 0}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {item?.date ? moment(item.date).format('MMMM Do YYYY') : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer section for summary data */}
          <div className="mt-4 flex justify-between items-center space-y-2">
            <div>
              {totalGivenRiceOneBorder !== undefined && <p>মোট চাল দিছেন : {totalGivenRiceOneBorder} পট</p>}
              {totalEatenRiceOneBorder !== undefined && <p>টোটাল চাল খাইচ্ছেন : {totalEatenRiceOneBorder} পট</p>}
              {chalPabane !== undefined && (
                <p>
                  {chalPabane > 0 ? `চাল পাবেন : ${chalPabane} পট` : `আপনার কাচ্ছে চাল পাবে : ${Math.abs(chalPabane)} পট`}
                </p>
              )}
            </div>
            <div>
              <img src={millQrImg} alt="" />
            </div>
          </div>

          <div className="mt-4 text-right">
            <p>Issue Date: {new Date().toLocaleString()}</p>
          </div>

          {/* Download CSV Button */}
          
        </div>
      </div>
    </div>
  )
}

export default ThirtyDaysRiceCalculationTable
