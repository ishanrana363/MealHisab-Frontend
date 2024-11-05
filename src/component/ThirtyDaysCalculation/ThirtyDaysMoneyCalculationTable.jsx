/* eslint-disable react/prop-types */
import moment from 'moment';

const ThirtyDaysMoneyCalculationTable = ({
  qrImageUrl,
  takaPaba,
  totalMoneyOneBorderGiven,
  totalMillCost,
  totalMillEatenOneBorder,
  borderDataList,
}) => {
  return (
    <div className="my-10">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Total Calculation</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4 border-b border-gray-300">#</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300">Mill</th>
              <th className="py-2 px-4 border-b border-gray-300">Mill Price </th>
              <th className="py-2 px-4 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {borderDataList &&
              borderDataList.map((item, i) => (
                <tr key={i} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-4 border-b border-gray-300">{i + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item?.borderData?.name || 'Unknown'}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <img
                      src={item?.borderData?.img || '/default-image.jpg'}
                      alt={
                        item?.borderData?.name
                          ? `${item.borderData.name}'s profile picture`
                          : 'Default profile picture'
                      }
                      className="w-12 h-12 rounded-full block mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">{item?.mill || 0}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item?.millPrice || 0}</td>
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
            {totalMoneyOneBorderGiven !== undefined && <p>মোট টাকা দিচ্ছেন : {totalMoneyOneBorderGiven} টাকা</p>}
            {totalMillEatenOneBorder !== undefined && <p>টোটাল মিল খাইচ্ছেন : {totalMillEatenOneBorder} টা</p>}
            {totalMillCost !== undefined && <p>মিল খরছ হইচ্ছে : {totalMillCost} টাকা</p>}
            {takaPaba !== undefined && (
              <p>
                {takaPaba > 0 ? `টাকা পাবেন : ${takaPaba} টাকা` : `আপনার কাচ্ছে পাবে : ${Math.abs(takaPaba)} টাকা`}
              </p>
            )}
          </div>
          <div>{qrImageUrl && <img src={qrImageUrl} alt="QR code" className="w-24 h-24" />}</div>
        </div>

        <div className="mt-4 text-right">
          <p>Issue Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ThirtyDaysMoneyCalculationTable;
