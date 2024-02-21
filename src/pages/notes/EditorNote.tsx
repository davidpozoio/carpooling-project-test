import { Editor } from "draft-js";
import { NoteGetDto, NotePatchContent } from "../../models/noteModel";
import useLocationData from "../../hooks/useLocationData";
import useEditor from "../../hooks/useEditor";
import useDebounce from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { getNoteById, patchNote } from "../../services/noteService";
import { useEffect, useState } from "react";
import ROUTES from "../../consts/routes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CACHE_KEYS from "../../consts/cache-keys";
import ERROR_CODES from "../../consts/errorCode";
import { useAppStore } from "../../store/store";
import { LeftOutlined } from "@ant-design/icons";
import BlockLink from "../../components/BlockLink";
import "./styles/editor-note-styles.css";
import useTitle from "../../hooks/useTitle";

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
  const setBlockLinks = useAppStore((state) => state.setBlockLinks);

  useEffect(() => {
    window.history.replaceState({}, "", ROUTES.NOTES.EDITORID(Number(id)));
  }, [id]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: NotePatchContent) => patchNote(data),
    onError: (error: { response: { data: { code: string } } }) => {
      setErrorCode(error?.response?.data?.code);
    },
  });

  useTitle(noteData.title);

  const handleTitle = useDebounce((text: string) => {
    queryClient.setQueryData(
      [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
      (oldData?: NoteGetDto[]) => {
        if (!oldData) return [];

        const oldNote = oldData.find((note) => note.id === Number(id || ""));

        const updatedNote: NoteGetDto = {
          id: Number(id || ""),
          title: text,
          content: oldNote?.content || "",
        };

        return oldData.map((note) => {
          if (note.id === Number(id || "")) {
            return updatedNote;
          }
          return note;
        });
      }
    );

    setBlockLinks(false);
    mutate({ id: Number(id), title: text });
  }, 500);

  const handleContent = useDebounce((text: string) => {
    queryClient.setQueryData(
      [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
      (oldData?: NoteGetDto[]) => {
        if (!oldData) return [];

        const oldNote = oldData.find((note) => note.id === Number(id || ""));

        const updatedNote: NoteGetDto = {
          id: Number(id || ""),
          title: oldNote?.title || "",
          content: text,
        };

        return oldData.map((note) => {
          if (note.id === Number(id || "")) {
            return updatedNote;
          }
          return note;
        });
      }
    );
    setBlockLinks(false);
    mutate({ id: Number(id), content: text });
  }, 500);

  const title = useEditor(noteData.title, (text) => {
    setBlockLinks(true);
    handleTitle.debounce(text);
  });

  const content = useEditor(noteData.content, (text) => {
    setBlockLinks(true);
    handleContent.debounce(text);
  });

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
    <div className="--main-content note-grid">
      <BlockLink
        className="back-button gradient-title"
        to={ROUTES.NOTES.ME}
        testId="back-button"
      >
        <LeftOutlined />
      </BlockLink>
      {(!isDataPassed && isError) ||
      data?.data?.note.is_deleting ||
      errorCode ? (
        <span>
          {errorCode === ERROR_CODES.E1000.CODE
            ? "It can't update this note, please restore it"
            : "Note not found"}
        </span>
      ) : (
        <div className="editor-grid">
          <div
            onClick={() => title.focus()}
            data-testid="title-editor"
            className="gradient-title --small-title title-editor"
          >
            <Editor
              ref={title.ref}
              editorState={title.editor}
              onChange={title.handleEditor}
            />
          </div>
          <div onClick={() => content.focus()} className="content-editor">
            <Editor
              ref={content.ref}
              editorState={content.editor}
              onChange={content.handleEditor}
            />
          </div>
        </div>
      )}
      {!isDataPassed && isError && errorStatus === 500 && (
        <span>Hubo un error, ¿reintentar?</span>
      )}
    </div>
  );
};
export default EditorNote;
