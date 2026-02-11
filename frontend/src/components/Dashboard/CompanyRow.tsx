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
        <tr className="hover:bg-gray-50 transition duration-200">
            <td className="px-8 py-6">
                <div className="font-semibold text-gray-900">{company.name}</div>
            </td>
            <td className="py-6 text-gray-500 max-w-sm truncate">{company.description}</td>
            <td className="py-6 text-gray-500">{company.contact_email}</td>
            <td className="py-6">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor(company.status)}`}
                >
                    {company.status}
                </span>
            </td>
            <td className="px-8 py-6">
                <div className="flex justify-end items-center gap-2">

                    <button
                        onClick={() => { setEditingCompany(company); setModalOpen(true); }}
                        title="Edit"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-indigo-200 text-gray-600 transition-shadow shadow-sm hover:shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleDelete(company.id)}
                        title="Delete"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 hover:text-red-600 transition-shadow shadow-sm hover:shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleSendStatus(company)}
                        title="Send"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-shadow shadow-sm hover:shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>

                </div>
            </td>
        </tr>
    );
}

export default CompanyRow;
