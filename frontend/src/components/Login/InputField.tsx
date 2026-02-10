import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    icon?: ReactNode;
}

const InputField = ({ label, id, icon, ...props }: InputFieldProps) => (
    <div className="space-y-2 transition-all duration-200">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>

        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
            )}

            <input
                id={id}
                {...props}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
            />
        </div>
    </div>
);

export default InputField;