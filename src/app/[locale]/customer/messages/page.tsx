// src/app/[locale]/customer/messages/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
}

interface Conversation {
    id: string;
    provider: {
        name: string;
        avatar: string;
    };
    lastMessage: string;
    timestamp: string;
    unread: number;
    messages: Message[];
}

export default function CustomerMessagesPage() {
    const t = useTranslations('customer.messages');
    const searchParams = useSearchParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock conversations - Provider tarafından
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            lastMessage: 'Great! I can help you with Swedish. When would you like to start?',
            timestamp: '2024-11-07T15:30:00',
            unread: 2,
            messages: [
                {
                    id: 'm1',
                    text: 'Hi! I would like to book Swedish lessons',
                    sender: 'me',
                    timestamp: '2024-11-07T14:00:00'
                },
                {
                    id: 'm2',
                    text: 'Hello! I would love to help you learn Swedish. What is your current level?',
                    sender: 'them',
                    timestamp: '2024-11-07T14:05:00'
                },
                {
                    id: 'm3',
                    text: 'I am a complete beginner. I just moved to Sweden.',
                    sender: 'me',
                    timestamp: '2024-11-07T14:10:00'
                },
                {
                    id: 'm4',
                    text: 'Perfect! I specialize in helping beginners. We can start with basic conversation and grammar.',
                    sender: 'them',
                    timestamp: '2024-11-07T14:15:00'
                },
                {
                    id: 'm5',
                    text: 'Great! I can help you with Swedish. When would you like to start?',
                    sender: 'them',
                    timestamp: '2024-11-07T15:30:00'
                }
            ]
        },
        {
            id: '2',
            provider: {
                name: 'Erik Andersson',
                avatar: 'https://i.pravatar.cc/150?img=12'
            },
            lastMessage: 'Yes, I can come this Saturday at 10 AM',
            timestamp: '2024-11-07T12:20:00',
            unread: 0,
            messages: [
                {
                    id: 'm1',
                    text: 'Hi, I need home cleaning service. Are you available this week?',
                    sender: 'me',
                    timestamp: '2024-11-07T12:00:00'
                },
                {
                    id: 'm2',
                    text: 'Yes, I can come this Saturday at 10 AM',
                    sender: 'them',
                    timestamp: '2024-11-07T12:20:00'
                }
            ]
        },
        {
            id: '3',
            provider: {
                name: 'Maria Santos',
                avatar: 'https://i.pravatar.cc/150?img=45'
            },
            lastMessage: 'I can translate your documents by next week',
            timestamp: '2024-11-06T16:45:00',
            unread: 0,
            messages: [
                {
                    id: 'm1',
                    text: 'Hello, I need translation services for official documents',
                    sender: 'me',
                    timestamp: '2024-11-06T16:00:00'
                },
                {
                    id: 'm2',
                    text: 'I can translate your documents by next week',
                    sender: 'them',
                    timestamp: '2024-11-06T16:45:00'
                }
            ]
        }
    ]);

    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Check if provider parameter is in URL
    useEffect(() => {
        const providerId = searchParams.get('provider');
        if (providerId && conversations.length > 0) {
            const conversation = conversations.find(c => c.id === providerId);
            if (conversation) {
                setSelectedConversation(conversation);
            } else {
                setSelectedConversation(conversations[0]);
            }
        } else if (conversations.length > 0) {
            setSelectedConversation(conversations[0]);
        }
    }, [searchParams]);

    // Auto scroll to bottom when new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation?.messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConversation) return;

        const newMessage: Message = {
            id: `m${Date.now()}`,
            text: messageInput,
            sender: 'me',
            timestamp: new Date().toISOString()
        };

        setConversations(conversations.map(conv =>
            conv.id === selectedConversation.id
                ? {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                    lastMessage: messageInput,
                    timestamp: newMessage.timestamp
                }
                : conv
        ));

        setSelectedConversation({
            ...selectedConversation,
            messages: [...selectedConversation.messages, newMessage],
            lastMessage: messageInput,
            timestamp: newMessage.timestamp
        });

        setMessageInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('title')}</h1>
                <p className="text-neutral-600">{t('subtitle')}</p>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                <div className="flex h-full">

                    {/* Conversations List */}
                    <div className="w-80 border-r border-neutral-200 flex flex-col">

                        {/* Search */}
                        <div className="p-4 border-b border-neutral-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={t('searchConversations')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Conversation Items */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => {
                                        setSelectedConversation(conversation);
                                        // Mark as read
                                        setConversations(conversations.map(c =>
                                            c.id === conversation.id ? { ...c, unread: 0 } : c
                                        ));
                                    }}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 ${
                                        selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                                    }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={conversation.provider.avatar}
                                            alt={conversation.provider.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        {conversation.unread > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {conversation.unread}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className={`font-semibold truncate ${conversation.unread > 0 ? 'text-neutral-900' : 'text-neutral-700'}`}>
                                                {conversation.provider.name}
                                            </h4>
                                            <span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
                                                {formatTime(conversation.timestamp)}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${conversation.unread > 0 ? 'text-neutral-900 font-medium' : 'text-neutral-600'}`}>
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    {selectedConversation ? (
                        <div className="flex-1 flex flex-col">

                            {/* Chat Header */}
                            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={selectedConversation.provider.avatar}
                                        alt={selectedConversation.provider.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">{selectedConversation.provider.name}</h3>
                                        <p className="text-xs text-green-600 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {t('active')}
                                        </p>
                                    </div>
                                </div>

                                <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
                                {selectedConversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                                            <div className={`px-4 py-3 rounded-2xl ${
                                                message.sender === 'me'
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-white text-neutral-900 border border-neutral-200'
                                            }`}>
                                                <p className="text-sm leading-relaxed">{message.text}</p>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-1 px-2">
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-neutral-200 bg-white">
                                <div className="flex items-end gap-3">
                                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors flex-shrink-0">
                                        <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>

                                    <textarea
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={t('typeMessage')}
                                        rows={1}
                                        className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                    />

                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                        className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-neutral-500 mt-2">
                                    {t('enterToSend')}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-neutral-50">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{t('selectConversation')}</h3>
                                <p className="text-neutral-600">{t('selectConversationDesc')}</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}