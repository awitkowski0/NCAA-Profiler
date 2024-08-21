const API_URL = 'http://localhost:89';
import {Report} from "../types/reports";
import { User } from "../types/user";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const register = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data: AuthResponse = await response.json();

  // Save the tokens to localStorage
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  return data;
};

export const validateToken = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:89/api/validate_token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return { username: data.username }; // Adjust based on your API response
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getReports = async (): Promise<Report[]> => {
  const response = await fetch(`${API_URL}/api/reports/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reports');
  }

  return response.json();
};

export const getReportById = async (reportId: number): Promise<Report> => {
  const response = await fetch(`${API_URL}/api/reports/${reportId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch report with ID ${reportId}`);
  }

  return response.json();
};


export const createReport = async (reportData: Omit<Report, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Report> => {
  const response = await fetch(`${API_URL}/api/reports/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to create report');
  }

  return response.json();
};

export const updateReport = async (reportId : number, reportData: Omit<Report, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  const response = await fetch(`/api/reports/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to update report');
  }

  return response.json();
};

export const deleteReport = async (reportId: number) => {
  const response = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete report');
  }
};