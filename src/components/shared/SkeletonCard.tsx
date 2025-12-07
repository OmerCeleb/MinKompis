// src/components/shared/SkeletonCard.tsx
export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 bg-neutral-200" />

            <div className="p-6 space-y-3">
                {/* Title */}
                <div className="h-6 bg-neutral-200 rounded w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 rounded" />
                    <div className="h-4 bg-neutral-200 rounded w-5/6" />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4">
                    <div className="h-5 bg-neutral-200 rounded w-24" />
                    <div className="h-8 bg-neutral-200 rounded w-20" />
                </div>
            </div>
        </div>
    );
}