import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import { NoteContent, NoteGetDto, NotePostDto } from "../models/noteModel";

export function getMyNotes() {
  return axios.get<{ notes: NoteGetDto[] }>(`${environment.HOST_BACK}/notes`);
}

export function createNote(note: NoteContent) {
  return axios.post<{ note: NotePostDto; message: string }>(
    `${environment.HOST_BACK}/notes`,
    note
  );
}
