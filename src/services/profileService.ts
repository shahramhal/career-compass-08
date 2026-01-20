import api from '@/lib/api';
import type { UserProfile, ApiResponse } from '@/types/api';

export const profileService = {
  async getProfile(userId: string): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>(`/api/profile/${userId}`);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch profile');
    }

    return response.data.data;
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put<ApiResponse<UserProfile>>('/api/profile', data);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update profile');
    }

    return response.data.data;
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<ApiResponse<{ avatarUrl: string }>>('/api/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to upload avatar');
    }

    return response.data.data;
  },

  async deleteAvatar(): Promise<void> {
    const response = await api.delete<ApiResponse<void>>('/api/profile/avatar');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete avatar');
    }
  },
};
