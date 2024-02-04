import { Editor } from "draft-js";
import { NoteGetDto, NotePatchContent } from "../../models/noteModel";
import useLocationData from "../../hooks/useLocationData";
import useEditor from "../../hooks/useEditor";
import useDebounce from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { getNoteById, patchNote } from "../../services/noteService";
import { useEffect, useState } from "react";
import ROUTES from "../../consts/routes";
import { useMutation, useQuery } from "react-query";
import CACHE_KEYS from "../../consts/cache-keys";
import ERROR_CODES from "../../consts/errorCode";

interface EditorNoteProps {
  note?: NoteGetDto;
}

const EditorNote = ({ note }: EditorNoteProps) => {
  const { data: noteData, isDataPassed } = useLocationData<NoteGetDto>(
    "note",
    note || { id: 1, title: "loading...", content: "loading..." }
  );
  const { id } = useParams();
  const [errorStatus, setErrorStatus] = useState(0);
  const [errorCode, setErrorCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.history.replaceState({}, "", ROUTES.NOTES.EDITORID(Number(id)));
  }, [id]);

  const { mutate } = useMutation({
    mutationFn: (data: NotePatchContent) => patchNote(data),
    onError: (error: { response: { data: { code: string } } }) => {
      setErrorCode(error?.response?.data?.code);
    },
  });

  const handleTitle = useDebounce((text: string) => {
    console.log(text);
    mutate({ id: Number(id), title: text });
  }, 600);

  const handleContent = useDebounce((text: string) => {
    console.log(text);
    mutate({ id: Number(id), content: text });
  }, 600);

  const title = useEditor(noteData.title, handleTitle.debounce);

  const content = useEditor(noteData.content, handleContent.debounce);

  const { isError, data } = useQuery({
    queryKey: [CACHE_KEYS.NOTE],
    queryFn: () => {
      if (!isDataPassed) {
        return getNoteById(Number(id));
      }
      return Promise.resolve(undefined);
    },
    onSuccess: (res) => {
      if (!res) return;
      const noteResponse = res.data.note;
      title.setPlainText(noteResponse.title);
      content.setPlainText(noteResponse.content);
    },
    onError: (err: { response: { status: number } }) => {
      setErrorStatus(err?.response?.status);
    },
    enabled: true,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {(!isDataPassed && isError) ||
      data?.data.note.is_deleting ||
      errorCode ? (
        <span>
          {errorCode === ERROR_CODES.E1000.CODE
            ? "It can't update this note, please restore it"
            : "Note not found"}
        </span>
      ) : (
        <>
          <div data-testid="title-editor" style={{ border: "1px solid black" }}>
            <Editor editorState={title.editor} onChange={title.handleEditor} />
          </div>
          <div style={{ border: "1px solid black" }}>
            <Editor
              editorState={content.editor}
              onChange={content.handleEditor}
            />
          </div>
        </>
      )}
      {!isDataPassed && isError && errorStatus === 500 && (
        <span>There was an error, retry?</span>
      )}
    </>
  );
};
export default EditorNote;
