export const fetchNotes = async (
  searchText: string,
  page: number = 1,
  perPage: number = 12,
  tag: string,
): Promise<ApiResponse> => {
  const response = await noteApi.get<ApiResponse>('/notes', {
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
  const response = await noteApi.get<Note>(`/notes/${noteId}`);
  return response.data;
};
