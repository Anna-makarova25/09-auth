import { nextServer } from './api';
import { Note } from '@/types/note';

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

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

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
};
