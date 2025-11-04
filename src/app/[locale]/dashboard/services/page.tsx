// src/app/[locale]/dashboard/services/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

interface Service {
    id: string;
    title: string;
    category: string;
    description: string;
    hourlyRate: number;
    duration: number;
    active: boolean;
}

export default function DashboardServicesPage() {
    const t = useTranslations('dashboard.services');
    const tCat = useTranslations('categories');
    const tCommon = useTranslations('common');

    const [services, setServices] = useState<Service[]>([
        {
            id: '1',
            title: 'Swedish Language Lessons - Beginner',
            category: 'education',
            description: 'Learn Swedish from scratch with structured lessons focusing on grammar, vocabulary, and pronunciation.',
            hourlyRate: 350,
            duration: 60,
            active: true
        },
        {
            id: '2',
            title: 'Swedish Language Lessons - Intermediate',
            category: 'education',
            description: 'Improve your Swedish skills with focus on conversation, reading comprehension, and writing.',
            hourlyRate: 400,
            duration: 60,
            active: true
        },
        {
            id: '3',
            title: 'Swedish Conversation Practice',
            category: 'education',
            description: 'Practice speaking Swedish in a relaxed environment. Perfect for building confidence.',
            hourlyRate: 300,
            duration: 45,
            active: false
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'education',
        description: '',
        hourlyRate: 350,
        duration: 60,
        active: true
    });

    const categories = [
        { id: 'education', name: tCat('education'), icon: '📚' },
        { id: 'home', name: tCat('home'), icon: '🏠' },
        { id: 'official', name: tCat('official'), icon: '📋' },
        { id: 'health', name: tCat('health'), icon: '💪' },
        { id: 'business', name: tCat('business'), icon: '💼' },
        { id: 'creative', name: tCat('creative'), icon: '🎨' },
    ];

    const handleAddService = () => {
        setShowAddForm(true);
        setEditingService(null);
        setFormData({
            title: '',
            category: 'education',
            description: '',
            hourlyRate: 350,
            duration: 60,
            active: true
        });
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setShowAddForm(true);
        setFormData({
            title: service.title,
            category: service.category,
            description: service.description,
            hourlyRate: service.hourlyRate,
            duration: service.duration,
            active: service.active
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingService) {
            // Update existing service
            setServices(services.map(s =>
                s.id === editingService.id
                    ? { ...s, ...formData }
                    : s
            ));
        } else {
            // Add new service
            const newService: Service = {
                id: Date.now().toString(),
                ...formData
            };
            setServices([...services, newService]);
        }

        setShowAddForm(false);
        setEditingService(null);
    };

    const handleToggleActive = (serviceId: string) => {
        setServices(services.map(s =>
            s.id === serviceId
                ? { ...s, active: !s.active }
                : s
        ));
    };

    const handleDeleteService = (serviceId: string) => {
        if (confirm(t('confirmDelete'))) {
            setServices(services.filter(s => s.id !== serviceId));
        }
    };

    const getCategoryIcon = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.icon || '📦';
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || categoryId;
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('title')}</h1>
                    <p className="text-neutral-600">{t('subtitle')}</p>
                </div>
                <Button onClick={handleAddService} size="lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {t('addService')}
                </Button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            {editingService ? t('editService') : t('addNewService')}
                        </h2>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('serviceTitle')} *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={t('serviceTitlePlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('category')} *
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat.id })}
                                        className={`p-4 border-2 rounded-lg transition-all text-left ${
                                            formData.category === cat.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-2 block">{cat.icon}</span>
                                        <span className="text-sm font-medium text-neutral-900">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('description')} *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('descriptionPlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Hourly Rate & Duration */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    {t('hourlyRate')} (SEK) *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="50"
                                    value={formData.hourlyRate}
                                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    {t('duration')} ({t('minutes')}) *
                                </label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value={30}>30 {t('minutes')}</option>
                                    <option value={45}>45 {t('minutes')}</option>
                                    <option value={60}>60 {t('minutes')}</option>
                                    <option value={90}>90 {t('minutes')}</option>
                                    <option value={120}>120 {t('minutes')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Status */}
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                                <div>
                                    <span className="text-sm font-medium text-neutral-900">{t('activeService')}</span>
                                    <p className="text-xs text-neutral-600">{t('activeServiceDesc')}</p>
                                </div>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" size="lg" className="flex-1">
                                {editingService ? t('updateService') : t('createService')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => setShowAddForm(false)}
                            >
                                {tCommon('cancel')}
                            </Button>
                        </div>

                    </form>
                </div>
            )}

            {/* Services List */}
            <div className="space-y-4">
                {services.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('noServices')}</h3>
                        <p className="text-neutral-600 mb-6">{t('noServicesDesc')}</p>
                        <Button onClick={handleAddService}>
                            {t('addFirstService')}
                        </Button>
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                            <div className="flex items-start gap-6">

                                {/* Icon */}
                                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                                    {getCategoryIcon(service.category)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                                                {service.active ? (
                                                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {t('active')}
                          </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                            {t('inactive')}
                          </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-neutral-600 mb-3">{getCategoryName(service.category)}</p>
                                            <p className="text-neutral-700 leading-relaxed mb-4">{service.description}</p>

                                            <div className="flex items-center gap-6 text-sm">
                                                <div className="flex items-center gap-2 text-neutral-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-semibold text-neutral-900">{service.hourlyRate} SEK/h</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-neutral-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{service.duration} {t('minutes')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleToggleActive(service.id)}
                                                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                                title={service.active ? t('deactivate') : t('activate')}
                                            >
                                                {service.active ? (
                                                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleEditService(service)}
                                                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                                title={t('edit')}
                                            >
                                                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => handleDeleteService(service.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                title={t('delete')}
                                            >
                                                <svg className="w-5 h-5 text-neutral-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}