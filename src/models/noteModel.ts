import { Optional } from "../utils/types";

export interface NoteContent {
  title: string;
  content: string;
}

export type NotePatchContent = Optional<NoteContent> & { id: number };

export interface NoteGetDto extends NoteContent {
  id: number;
  is_deleting?: boolean;
}

export interface NotePostDto extends NoteContent {
  id: number;
  userId: number;
}
