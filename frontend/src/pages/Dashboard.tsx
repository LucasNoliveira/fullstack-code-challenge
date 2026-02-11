import { useEffect, useState } from 'react';
import Header from "../components/Dashboard/Header";
import Filters from "../components/Dashboard/Filters";
import CompanyTable from "../components/Dashboard/CompanyTable";
import Pagination from "../components/Dashboard/Pagination";

type Status = 'ready' | 'in_progress' | 'done' | 'cancelled';

interface Company {
    id: number;
    name: string;
    description: string;
    contact_email: string;
    status: Status;
}

const PAGE_SIZE = 5;

let mockCompanies: Company[] = Array.from({ length: 27 }).map((_, index) => ({
    id: index + 1,
    name: `Company ${index + 1}`,
    description: `Description for company ${index + 1}`,
    contact_email: `company${index + 1}@email.com`,
    status: ['ready', 'in_progress', 'done', 'cancelled'][
        Math.floor(Math.random() * 4)
    ] as Status,
}));


const Dashboard = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const fetchCompanies = () => {
        setLoading(true);

        setTimeout(() => {
            let filtered = [...mockCompanies];

            if (statusFilter !== 'all') {
                filtered = filtered.filter((c) => c.status === statusFilter);
            }

            if (search) {
                const s = search.toLowerCase();
                filtered = filtered.filter(
                    (c) =>
                        c.name.toLowerCase().includes(s) ||
                        c.description.toLowerCase().includes(s) ||
                        c.contact_email.toLowerCase().includes(s)
                );
            }

            setTotal(filtered.length);

            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;

            setCompanies(filtered.slice(start, end));
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        fetchCompanies();
    }, [page, search, statusFilter]);

    const handleSave = (company: Omit<Company, 'id'>) => {
        if (editingCompany) {
            mockCompanies = mockCompanies.map((c) =>
                c.id === editingCompany.id ? { ...c, ...company } : c
            );
        } else {
            mockCompanies.unshift({
                id: Date.now(),
                ...company,
            });
        }

        setModalOpen(false);
        setEditingCompany(null);
        fetchCompanies();
    };

    const handleDelete = (id: number) => {
        mockCompanies = mockCompanies.filter((c) => c.id !== id);
        fetchCompanies();
    };

    const handleSendStatus = async (company: Company) => {
        try {
            await new Promise((res, rej) =>
                setTimeout(() => (Math.random() > 0.2 ? res(true) : rej()), 800)
            );

            alert(`Status sent to ${company.contact_email}`);
        } catch {
            alert(`Failed to send email to ${company.contact_email}`);
        }
    };

    const statusColor = (status: Status) => {
        switch (status) {
            case 'ready':
                return 'bg-blue-100 text-blue-700';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-700';
            case 'done':
                return 'bg-green-100 text-green-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <Header onNewCompany={() => { /* lógica */ }} />
                <Filters search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} setPage={setPage} />
                <CompanyTable companies={companies} loading={loading} statusColor={statusColor} setEditingCompany={setEditingCompany} setModalOpen={setModalOpen} handleDelete={handleDelete} handleSendStatus={handleSendStatus} />
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>

            {
                modalOpen && (
                    <CompanyModal
                        company={editingCompany}
                        onClose={() => setModalOpen(false)}
                        onSave={handleSave}
                    />
                )
            }
        </div >
    );
};

interface ModalProps {
    company: Company | null;
    onClose: () => void;
    onSave: (company: Omit<Company, 'id'>) => void;
}

const CompanyModal = ({ company, onClose, onSave }: ModalProps) => {
    const [form, setForm] = useState<Omit<Company, 'id'>>({
        name: company?.name || '',
        description: company?.description || '',
        contact_email: company?.contact_email || '',
        status: company?.status || 'ready',
    });

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold">
                    {company ? 'Edit Company' : 'New Company'}
                </h2>

                <input
                    placeholder="Name"
                    className="w-full border px-4 py-2 rounded-lg"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Description"
                    className="w-full border px-4 py-2 rounded-lg"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-4 py-2 rounded-lg"
                    value={form.contact_email}
                    onChange={(e) =>
                        setForm({ ...form, contact_email: e.target.value })
                    }
                />

                <select
                    className="w-full border px-4 py-2 rounded-lg"
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value as Status })
                    }
                >
                    <option value="ready">Ready</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <div className="flex justify-end gap-3 pt-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(form)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;