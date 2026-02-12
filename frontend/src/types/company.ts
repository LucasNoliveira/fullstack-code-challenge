export type CompanyStatus = 'ready' | 'in_progress' | 'done' | 'cancelled';

export interface Company {
    id: string;
    name: string;
    description: string;
    contact_email: string;
    status: CompanyStatus;
    created_at: string;
}
