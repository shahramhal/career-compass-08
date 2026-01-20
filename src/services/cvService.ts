import api from '@/lib/api';
import type { CV, ApiResponse } from '@/types/api';

export const cvService = {
  async uploadCV(file: File, onProgress?: (percent: number) => void): Promise<CV> {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await api.post<ApiResponse<CV>>('/api/ml/parse-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to upload CV');
    }

    return response.data.data;
  },

  async getAllCVs(): Promise<CV[]> {
    const response = await api.get<ApiResponse<CV[]>>('/api/ml/cvs');
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch CVs');
    }

    return response.data.data;
  },

  async getCV(cvId: string): Promise<CV> {
    const response = await api.get<ApiResponse<CV>>(`/api/ml/cvs/${cvId}`);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch CV');
    }

    return response.data.data;
  },

  async setPrimaryCV(cvId: string): Promise<CV> {
    const response = await api.patch<ApiResponse<CV>>(`/api/ml/cvs/${cvId}/primary`);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to set primary CV');
    }

    return response.data.data;
  },

  async deleteCV(cvId: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/api/ml/cvs/${cvId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete CV');
    }
  },

  async downloadCV(cvId: string): Promise<Blob> {
    const response = await api.get(`/api/ml/cvs/${cvId}/download`, {
      responseType: 'blob',
    });

    return response.data;
  },

  validateFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only PDF and DOCX files are allowed' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }

    return { valid: true };
  },
};
