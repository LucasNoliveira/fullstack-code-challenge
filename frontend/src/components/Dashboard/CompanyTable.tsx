import CompanyRow from "./CompanyRow";

interface CompanyTableProps {
    companies: any[];
    loading: boolean;
    statusColor: (status: string) => string;
    setEditingCompany: (company: any) => void;
    setModalOpen: (open: boolean) => void;
    handleDelete: (id: string) => void;
    handleSendStatus: (company: any) => void;
}

const CompanyTable = ({
    companies,
    loading,
    statusColor,
    setEditingCompany,
    setModalOpen,
    handleDelete,
    handleSendStatus,
}: CompanyTableProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                        <tr className="text-xs uppercase tracking-wider text-gray-500">
                            <th className="px-8 py-5 text-left font-semibold">Company</th>
                            <th className="py-5 text-left font-semibold">Description</th>
                            <th className="py-5 text-left font-semibold">Email</th>
                            <th className="py-5 text-left font-semibold">Status</th>
                            <th className="px-8 py-5 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-gray-400">
                                    Loading companies...
                                </td>
                            </tr>
                        ) : (
                            companies.map((company) => (
                                <CompanyRow
                                    key={company.id}
                                    company={company}
                                    statusColor={statusColor}
                                    setEditingCompany={setEditingCompany}
                                    setModalOpen={setModalOpen}
                                    handleDelete={handleDelete}
                                    handleSendStatus={handleSendStatus}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompanyTable;
