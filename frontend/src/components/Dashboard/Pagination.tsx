interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
    return (
        <div className="flex justify-between items-center px-6 py-4 border-t">
            <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
            <div className="space-x-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
        </div>
    );
}

export default Pagination;
