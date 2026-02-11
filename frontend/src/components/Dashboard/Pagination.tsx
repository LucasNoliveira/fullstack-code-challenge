interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-3 mt-6">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg bg-white shadow-md border border-gray-200 disabled:opacity-50 hover:bg-indigo-50 transition"
            >
                Prev
            </button>

            {getPages().map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-1 rounded-lg font-medium shadow-md transition
            ${p === page
                            ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-indigo-50'
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg bg-white shadow-md border border-gray-200 disabled:opacity-50 hover:bg-indigo-50 transition"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
