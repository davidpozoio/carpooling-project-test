import { Editor } from "draft-js";
import { NoteGetDto } from "../../models/noteModel";
import useLocationData from "../../hooks/useLocationData";
import useEditor from "../../hooks/useEditor";
import { debounce } from "../../utils/functions";

interface EditorNoteProps {
  note?: NoteGetDto;
}

const EditorNote = ({ note }: EditorNoteProps) => {
  const { data: noteData } = useLocationData<NoteGetDto>(
    "note",
    note || { id: 1, title: "default", content: "default" }
  );

  const title = useEditor(noteData.title);

  const content = useEditor(noteData.content);

  return (
    <>
      <div data-testid="title-editor" style={{ border: "1px solid black" }}>
        <Editor editorState={title.editor} onChange={title.handleEditor} />
      </div>
      <div style={{ border: "1px solid black" }}>
        <Editor editorState={content.editor} onChange={content.handleEditor} />
      </div>
    </>
  );
};
export default EditorNote;
