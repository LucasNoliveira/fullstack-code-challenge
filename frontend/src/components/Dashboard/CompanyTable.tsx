import type { Company, CompanyStatus } from "../../types/company";
import CompanyRow from "./CompanyRow";

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  statusColor: (status: CompanyStatus) => string;
  setEditingCompany: (company: Company) => void;
  setModalOpen: (open: boolean) => void;
  handleDelete: (id: string) => void;
  handleSendStatus: (company: Company) => void;
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
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-8 py-5">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="py-5">
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </td>
                    <td className="py-5">
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </td>
                    <td className="py-5">
                      <div className="h-4 bg-gray-200 rounded w-2/6"></div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="h-4 bg-gray-200 rounded w-4/6 ml-auto"></div>
                    </td>
                  </tr>
                ))
              : companies.map((company) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    statusColor={statusColor}
                    setEditingCompany={setEditingCompany}
                    setModalOpen={setModalOpen}
                    handleDelete={handleDelete}
                    handleSendStatus={handleSendStatus}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;
