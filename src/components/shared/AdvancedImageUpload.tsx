// src/components/shared/AdvancedImageUpload.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { API_CONFIG } from '@/lib/api/config';
import { api } from '@/lib/api';
import { useToast } from '@/hooks';

interface AdvancedImageUploadProps {
    currentImage?: string;
    onUploadComplete: (url: string) => void;
    uploadType?: 'image' | 'avatar' | 'document';
    maxSize?: number;
    allowedTypes?: string[];
    label?: string;
    description?: string;
    className?: string;
    shape?: 'square' | 'circle';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    autoUpload?: boolean;
}

const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48',
};

export default function AdvancedImageUpload({
                                                currentImage,
                                                onUploadComplete,
                                                uploadType = 'image',
                                                maxSize = API_CONFIG.MAX_FILE_SIZE,
                                                allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
                                                label,
                                                description,
                                                className = '',
                                                shape = 'square',
                                                size = 'lg',
                                                autoUpload = true,
                                            }: AdvancedImageUploadProps) {
    const t = useTranslations('common');
    const tUpload = useTranslations('upload');
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validateFile = (file: File): boolean => {
        setError(null);

        if (!allowedTypes.includes(file.type)) {
            setError(tUpload('invalidFileType'));
            return false;
        }

        if (file.size > maxSize) {
            const maxSizeMB = Math.round(maxSize / 1024 / 1024);
            setError(tUpload('fileTooLarge', { size: maxSizeMB }));
            return false;
        }

        return true;
    };

    const uploadFile = async (file: File) => {
        setUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            let response;

            switch (uploadType) {
                case 'avatar':
                    response = await api.upload.uploadAvatar(file, (progress) => {
                        setUploadProgress(progress);
                    });
                    break;
                case 'document':
                    response = await api.upload.uploadDocument(file, (progress) => {
                        setUploadProgress(progress);
                    });
                    break;
                default:
                    response = await api.upload.uploadImage(file, (progress) => {
                        setUploadProgress(progress);
                    });
            }

            if (response.success && response.data?.url) {
                onUploadComplete(response.data.url);
                showToast(tUpload('uploadSuccess'), 'success');
            } else {
                throw new Error(response.error || 'Upload failed');
            }
        } catch (err: any) {
            const errorMessage = err.message || tUpload('uploadFailed');
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleFileChange = useCallback(async (file: File) => {
        if (!validateFile(file)) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setSelectedFile(file);

        if (autoUpload) {
            await uploadFile(file);
        }
    }, [autoUpload, maxSize, allowedTypes]);

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
        setSelectedFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleManualUpload = async () => {
        if (selectedFile) {
            await uploadFile(selectedFile);
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
                        <>
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />

                            {uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="w-16 h-16 mx-auto mb-2">
                                            <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium">{uploadProgress}%</p>
                                    </div>
                                </div>
                            )}
                        </>
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

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={allowedTypes.join(',')}
                        onChange={handleInputChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleClick}
                            disabled={uploading}
                            className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {preview ? tUpload('change') : tUpload('upload')}
                        </button>

                        {!autoUpload && selectedFile && !uploading && (
                            <button
                                type="button"
                                onClick={handleManualUpload}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                            >
                                {tUpload('startUpload')}
                            </button>
                        )}

                        {preview && !uploading && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                {tUpload('remove')}
                            </button>
                        )}
                    </div>

                    {uploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-neutral-600">
                                <span>{tUpload('uploading')}</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-600 transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

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

                    {!error && !uploading && (
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