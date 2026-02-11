import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";

interface FiltersProps {
    search: string;
    setSearch: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    setPage: (page: number) => void;
}

const Filters = ({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    setPage,
}: FiltersProps) => {
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-5 flex flex-col md:flex-row gap-4 md:items-center">
            <SearchInput search={search} setSearch={setSearch} setPage={setPage} />
            <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} setPage={setPage} />
        </div>
    );
}

export default Filters
