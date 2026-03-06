import { User } from '@/types/user';
import { Note } from '@/types/note';
import { nextServer } from './api';

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  searchText: string,
  page: number = 1,
  perPage: number = 12,
  tag: string,
): Promise<ApiResponse> => {
  const response = await nextServer.get<ApiResponse>('/notes', {
    params: {
      search: searchText || undefined,
      page: page,
      perPage: perPage,
      tag: tag || undefined,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await nextServer.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};
