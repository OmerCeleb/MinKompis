// src/lib/api/services/message.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Conversation, Message, SendMessageRequest } from '../types';

export const messageService = {
    /**
     * Get all conversations
     */
    async getConversations() {
        return apiClient.get<Conversation[]>(API_ENDPOINTS.MESSAGES.CONVERSATIONS);
    },

    /**
     * Get conversation by ID
     */
    async getConversation(id: string) {
        return apiClient.get<Conversation>(
            API_ENDPOINTS.MESSAGES.GET_CONVERSATION(id)
        );
    },

    /**
     * Send message
     */
    async sendMessage(data: SendMessageRequest) {
        return apiClient.post<Message>(API_ENDPOINTS.MESSAGES.SEND, data);
    },

    /**
     * Mark message as read
     */
    async markAsRead(messageId: string) {
        return apiClient.post(API_ENDPOINTS.MESSAGES.MARK_READ(messageId));
    },
};