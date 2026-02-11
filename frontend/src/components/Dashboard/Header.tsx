interface HeaderProps {
    onNewCompany: () => void;
}

const Header = ({ onNewCompany }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <button
                onClick={onNewCompany}
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
            >
                + New Company
            </button>
        </div>
    );
}

export default Header;
