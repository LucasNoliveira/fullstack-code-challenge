interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
    setPage: (page: number) => void;
}

const SearchInput = ({ search, setSearch, setPage }: SearchInputProps) => {
    return (
        <div className="relative flex-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
                placeholder="Search companies..."
                value={search}
                onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent 
                 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                 transition-all outline-none text-sm"
            />
        </div>
    );
}

export default SearchInput;
