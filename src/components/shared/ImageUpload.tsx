// src/components/shared/ImageUpload.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { API_CONFIG } from '@/lib/api/config';

interface ImageUploadProps {
    currentImage?: string;
    onImageChange: (file: File | null) => void;
    onImageUrlChange?: (url: string) => void;
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    label?: string;
    description?: string;
    className?: string;
    shape?: 'square' | 'circle';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48',
};

export default function ImageUpload({
                                        currentImage,
                                        onImageChange,
                                        maxSize = API_CONFIG.MAX_FILE_SIZE,
                                        allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
                                        label,
                                        description,
                                        className = '',
                                        shape = 'square',
                                        size = 'lg',
                                    }: ImageUploadProps) {
    const t = useTranslations('common');
    const tUpload = useTranslations('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        setError(null);

        // Check file type
        if (!allowedTypes.includes(file.type)) {
            setError(tUpload('invalidFileType'));
            return false;
        }

        // Check file size
        if (file.size > maxSize) {
            const maxSizeMB = Math.round(maxSize / 1024 / 1024);
            setError(tUpload('fileTooLarge', { size: maxSizeMB }));
            return false;
        }

        return true;
    };

    const handleFileChange = useCallback((file: File) => {
        if (!validateFile(file)) {
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Call parent callback
        onImageChange(file);
    }, [onImageChange, maxSize, allowedTypes]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const sizeClass = sizeClasses[size];
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

    return (
        <div className={`space-y-4 ${className}`}>
            {label && (
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                        {label}
                    </label>
                    {description && (
                        <p className="text-sm text-neutral-500">{description}</p>
                    )}
                </div>
            )}

            <div className="flex items-start gap-6">
                {/* Preview / Upload Area */}
                <div
                    className={`${sizeClass} ${shapeClass} relative overflow-hidden border-2 border-dashed transition-all ${
                        isDragging
                            ? 'border-primary-500 bg-primary-50'
                            : error
                                ? 'border-red-300 bg-red-50'
                                : preview
                                    ? 'border-transparent'
                                    : 'border-neutral-300 bg-neutral-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors"
                            onClick={handleClick}
                        >
                            <svg
                                className="w-12 h-12 text-neutral-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-xs text-neutral-500 text-center px-2">
                {tUpload('clickOrDrag')}
              </span>
                        </div>
                    )}

                    {/* Hidden input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={allowedTypes.join(',')}
                        onChange={handleInputChange}
                        className="hidden"
                    />
                </div>

                {/* Buttons & Info */}
                <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                            {preview ? tUpload('change') : tUpload('upload')}
                        </button>

                        {preview && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                {tUpload('remove')}
                            </button>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <svg
                                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Info */}
                    {!error && (
                        <div className="text-xs text-neutral-500 space-y-1">
                            <p>
                                {tUpload('allowedFormats')}:{' '}
                                {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
                            </p>
                            <p>
                                {tUpload('maxSize')}: {Math.round(maxSize / 1024 / 1024)}MB
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}