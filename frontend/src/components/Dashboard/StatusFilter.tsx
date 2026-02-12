import type { CompanyStatus } from "../../services/authService";

interface StatusFilterProps {
  statusFilter: CompanyStatus | "all";
  setStatusFilter: (value: CompanyStatus | "all") => void;
  setPage: (page: number) => void;
}

const StatusFilter = ({ statusFilter, setStatusFilter, setPage }: StatusFilterProps) => {
  return (
    <div className="relative">
      <select
        value={statusFilter}
        onChange={(e) => {
          setPage(1);
          setStatusFilter(e.target.value as CompanyStatus | "all");
        }}
        className="appearance-none px-5 py-3 pr-10 rounded-xl bg-gray-50 border border-transparent
         focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
         transition-all outline-none text-sm cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="ready">Ready</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <svg
        className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

export default StatusFilter;