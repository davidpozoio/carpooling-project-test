export interface NoteContent {
  title: string;
  content: string;
}

export interface NoteGetDto extends NoteContent {
  id: number;
}

export interface NotePostDto extends NoteContent {
  id: number;
  userId: number;
}
