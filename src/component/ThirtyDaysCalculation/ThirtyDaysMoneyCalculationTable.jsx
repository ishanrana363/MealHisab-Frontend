/* eslint-disable react/prop-types */
import moment from 'moment';

const ThirtyDaysMoneyCalculationTable = ({ millKayarDate, takaDayarDate, takaPaba, takaDisa, totalMill, millKhorajTka }) => {
  
  // Function to download table data as CSV
  const downloadCSV = () => {
    // Table headers
    const headers = ['#', 'Name', 'Image URL', 'Money', 'Date'];
    
    // Table rows
    const rows = takaDayarDate.map((item, i) => [
      i + 1,
      item?.borderData?.name || 'Unknown',
      item?.borderData?.img || 'No image',
      item?.totalMoney || 0,
      item?.date ? moment(item.date).format('MMMM Do YYYY') : 'N/A'
    ]);

    // Combine headers and rows into CSV format
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table-data.csv';
    link.click();
  };

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
              <th className="py-2 px-4 border-b border-gray-300">Money</th>
              <th className="py-2 px-4 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {takaDayarDate && takaDayarDate.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b border-gray-300">{i + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item?.borderData?.name || 'Unknown'}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <img
                    src={item?.borderData?.img || '/default-image.jpg'} 
                    alt={item?.borderData?.name ? `${item.borderData.name} Image` : 'Border Image'}
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
        <div className="mt-4 text-center">
          {takaDisa !== undefined && <p>মোট টাকা দিচ্ছেন: {takaDisa} টাকা</p>}
          {totalMill !== undefined && <p>টোটাল মিল খাইচ্ছেন: {totalMill} টা</p>}
          {millKhorajTka !== undefined && <p>মিল খরছ হইচ্ছে: {millKhorajTka} টাকা</p>}
          {takaPaba !== undefined && (
            <p>
              {takaPaba > 0 ? `টাকা পাবেন: ${takaPaba} টাকা` : `আপনার কাচ্ছে পাবে: ${Math.abs(takaPaba)} টাকা`}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <p className="text-center">Issue Date: {new Date().toLocaleString()}</p>
        </div>
      </div>
      <div>
        {/* Download CSV Button */}
        <button onClick={downloadCSV} className="btn block mx-auto mt-4">
          Download Table Data
        </button>
      </div>
    </div>
  );
};

export default ThirtyDaysMoneyCalculationTable;
