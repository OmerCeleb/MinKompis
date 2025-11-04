// src/app/[locale]/dashboard/messages/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
}

interface Conversation {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    lastMessage: string;
    timestamp: string;
    unread: number;
    messages: Message[];
}

export default function DashboardMessagesPage() {
    const t = useTranslations('dashboard.messages');
    const tCommon = useTranslations('common');

    // Mock conversations
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: '1',
            user: {
                name: 'Sarah Johnson',
                avatar: 'https://i.pravatar.cc/150?img=44'
            },
            lastMessage: 'Thank you! See you tomorrow at 2 PM',
            timestamp: '2024-11-07T15:30:00',
            unread: 2,
            messages: [
                {
                    id: 'm1',
                    text: 'Hi! I would like to book a Swedish lesson for tomorrow',
                    sender: 'them',
                    timestamp: '2024-11-07T14:00:00'
                },
                {
                    id: 'm2',
                    text: 'Hello Sarah! Of course, I have availability tomorrow. What time works best for you?',
                    sender: 'me',
                    timestamp: '2024-11-07T14:05:00'
                },
                {
                    id: 'm3',
                    text: 'Would 2 PM work?',
                    sender: 'them',
                    timestamp: '2024-11-07T14:10:00'
                },
                {
                    id: 'm4',
                    text: 'Perfect! 2 PM works great. I will send you a booking confirmation.',
                    sender: 'me',
                    timestamp: '2024-11-07T14:15:00'
                },
                {
                    id: 'm5',
                    text: 'Thank you! See you tomorrow at 2 PM',
                    sender: 'them',
                    timestamp: '2024-11-07T15:30:00'
                }
            ]
        },
        {
            id: '2',
            user: {
                name: 'Ahmed Ali',
                avatar: 'https://i.pravatar.cc/150?img=35'
            },
            lastMessage: 'Can we reschedule to next week?',
            timestamp: '2024-11-07T12:20:00',
            unread: 1,
            messages: [
                {
                    id: 'm1',
                    text: 'Hi, I have our lesson scheduled for Friday',
                    sender: 'them',
                    timestamp: '2024-11-07T12:00:00'
                },
                {
                    id: 'm2',
                    text: 'Can we reschedule to next week?',
                    sender: 'them',
                    timestamp: '2024-11-07T12:20:00'
                }
            ]
        },
        {
            id: '3',
            user: {
                name: 'Maria Garcia',
                avatar: 'https://i.pravatar.cc/150?img=38'
            },
            lastMessage: 'Perfect! Thank you so much',
            timestamp: '2024-11-06T18:45:00',
            unread: 0,
            messages: [
                {
                    id: 'm1',
                    text: 'Hello! I need help with job interview preparation in Swedish',
                    sender: 'them',
                    timestamp: '2024-11-06T17:00:00'
                },
                {
                    id: 'm2',
                    text: 'Hi Maria! I would be happy to help you. When is your interview?',
                    sender: 'me',
                    timestamp: '2024-11-06T17:15:00'
                },
                {
                    id: 'm3',
                    text: 'It is in two weeks. I want to practice common interview questions',
                    sender: 'them',
                    timestamp: '2024-11-06T17:30:00'
                },
                {
                    id: 'm4',
                    text: 'Great! We have plenty of time. I can help you prepare with mock interviews and vocabulary practice.',
                    sender: 'me',
                    timestamp: '2024-11-06T18:30:00'
                },
                {
                    id: 'm5',
                    text: 'Perfect! Thank you so much',
                    sender: 'them',
                    timestamp: '2024-11-06T18:45:00'
                }
            ]
        },
        {
            id: '4',
            user: {
                name: 'David Lee',
                avatar: 'https://i.pravatar.cc/150?img=42'
            },
            lastMessage: 'Great, I will send payment now',
            timestamp: '2024-11-05T16:00:00',
            unread: 0,
            messages: [
                {
                    id: 'm1',
                    text: 'Hi, I saw your profile and would like to book lessons',
                    sender: 'them',
                    timestamp: '2024-11-05T15:00:00'
                },
                {
                    id: 'm2',
                    text: 'Hello! I would love to help you. What are your goals with Swedish?',
                    sender: 'me',
                    timestamp: '2024-11-05T15:30:00'
                },
                {
                    id: 'm3',
                    text: 'Great, I will send payment now',
                    sender: 'them',
                    timestamp: '2024-11-05T16:00:00'
                }
            ]
        }
    ]);

    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('title')}</h1>
                <p className="text-neutral-600">{t('subtitle')}</p>
            </div>

            {/* Messages Interface */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                <div className="flex h-full">

                    {/* Conversations List */}
                    <div className="w-80 border-r border-neutral-200 flex flex-col">

                        {/* Search */}
                        <div className="p-4 border-b border-neutral-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('searchConversations')}
                                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                />
                                <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Conversations */}
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
                                            src={conversation.user.avatar}
                                            alt={conversation.user.name}
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
                                                {conversation.user.name}
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
                                        src={selectedConversation.user.avatar}
                                        alt={selectedConversation.user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">{selectedConversation.user.name}</h3>
                                        <p className="text-xs text-neutral-500">{t('active')}</p>
                                    </div>
                                </div>

                                <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {selectedConversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                                            <div className={`px-4 py-2 rounded-2xl ${
                                                message.sender === 'me'
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-neutral-100 text-neutral-900'
                                            }`}>
                                                <p className="text-sm leading-relaxed">{message.text}</p>
                                            </div>
                                            <p className={`text-xs text-neutral-500 mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                                <div className="flex gap-3">
                                    <button className="p-3 hover:bg-neutral-200 rounded-lg transition-colors">
                                        <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>

                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={t('typeMessage')}
                                        className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />

                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-neutral-50">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('selectConversation')}</h3>
                                <p className="text-neutral-600">{t('selectConversationDesc')}</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}