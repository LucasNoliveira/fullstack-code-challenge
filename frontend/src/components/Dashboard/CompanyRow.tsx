interface CompanyRowProps {
    company: any;
    statusColor: (status: string) => string;
    setEditingCompany: (company: any) => void;
    setModalOpen: (open: boolean) => void;
    handleDelete: (id: string) => void;
    handleSendStatus: (company: any) => void;
}

const CompanyRow = ({
    company,
    statusColor,
    setEditingCompany,
    setModalOpen,
    handleDelete,
    handleSendStatus,
}: CompanyRowProps) => {
    return (
        <tr className="hover:bg-gray-50/60 transition duration-200">
            <td className="px-8 py-6">
                <div className="font-semibold text-gray-900">{company.name}</div>
            </td>
            <td className="py-6 text-gray-500 max-w-sm truncate">{company.description}</td>
            <td className="py-6 text-gray-500">{company.contact_email}</td>
            <td className="py-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor(company.status)}`}>
                    {company.status}
                </span>
            </td>
            <td className="px-8 py-6">
                <div className="flex justify-end items-center gap-3">
                    <button onClick={() => { setEditingCompany(company); setModalOpen(true); }} className="text-indigo-600 hover:text-indigo-800 font-medium transition">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(company.id)} className="text-red-500 hover:text-red-700 font-medium transition">
                        Delete
                    </button>
                    <button onClick={() => handleSendStatus(company)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition">
                        Send
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CompanyRow;
