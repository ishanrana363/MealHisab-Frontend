/* eslint-disable react/prop-types */
import moment from 'moment'

const DailyRiceCalculationTable = ({ dailyRiceTotal, dailyRiceDataList }) => {
    return (
        <div>
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
                            {dailyRiceDataList && dailyRiceDataList.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-100 text-center">
                                    <td className="py-2 px-4 border-b border-gray-300">{i + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item?.borderData?.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <img src={item?.borderData?.img} alt="Border" className="w-12 h-12 rounded-full block mx-auto" />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item?.pot || 0}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        {item?.entry_date ? moment(item.entry_date).format('MMMM Do YYYY') : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-center">
                        {dailyRiceTotal !== undefined && <p>Total Pot Rice: {dailyRiceTotal}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyRiceCalculationTable
