// src/components/shared/EmptyState.tsx
import Button from './Button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export default function EmptyState({
                                       icon,
                                       title,
                                       description,
                                       action,
                                       className = ''
                                   }: EmptyStateProps) {
    return (
        <div className={`text-center py-12 ${className}`}>
            {icon && (
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                </div>
            )}

            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {title}
            </h3>

            {description && (
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                    {description}
                </p>
            )}

            {action && (
                <Button onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}