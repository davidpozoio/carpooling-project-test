import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import {
  NoteContent,
  NoteGetDto,
  NotePatchContent,
  NotePostDto,
} from "../models/noteModel";

export function getMyNotes(deleted: boolean = false) {
  return axios.get<{ notes: NoteGetDto[] }>(
    `${environment.HOST_BACK}/notes?deleted=${deleted}`
  );
}

export function createNote(note: NoteContent) {
  return axios.post<{ note: NotePostDto; message: string }>(
    `${environment.HOST_BACK}/notes`,
    note
  );
}
export function getNoteById(id: number) {
  return axios.get<{ note: NoteGetDto; message: string }>(
    `${environment.HOST_BACK}/notes/${id}`
  );
}

export function patchNote(noteData: NotePatchContent) {
  return axios.patch<{ message: string }>(
    `${environment.HOST_BACK}/notes/${noteData.id}`,
    noteData
  );
}

export function deleteNote(id: number) {
  return axios.delete<{ message: string }>(
    `${environment.HOST_BACK}/notes/${id}`
  );
}

export function markNoteAsDeleted(id: number) {
  return axios.patch<{ message: string }>(
    `${environment.HOST_BACK}/notes/${id}/true`
  );
}

export function restoreNote(id: number) {
  return axios.patch<{ message: string }>(
    `${environment.HOST_BACK}/notes/${id}/false`
  );
}
