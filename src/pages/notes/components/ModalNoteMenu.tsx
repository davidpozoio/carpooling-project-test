import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../../services/noteService";
import { NoteContent, NoteGetDto } from "../../../models/noteModel";
import ROUTES from "../../../consts/routes";
import CACHE_KEYS from "../../../consts/cache-keys";
import { useAppStore } from "../../../store/store";
import { useState } from "react";
import "../styles/modal-note-menu-styles.css";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";

interface ModalNoteMenuProps {
  show?: boolean;
  onClose?: () => void;
}

const ModalNoteMenu = ({
  show = false,
  onClose = () => {},
}: ModalNoteMenuProps) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const setIsCreatingNote = useAppStore((state) => state.setIsCreatingNote);
  const isCreatingNote = useAppStore((state) => state.isCreatingNote);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: NoteContent) => createNote(data),
    onSuccess: (response) => {
      const note = response.data.note;

      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [response.data.note, ...oldData];
        }
      );
      setIsCreatingNote(false);

      navigate(ROUTES.ROUTES.EDITORID(response.data.note.id), {
        state: { note },
      });
    },
    onError: (err) => {
      const error = err as { response: { status: number } };
      if (error?.response?.status === 500) {
        setErrorMessage(
          "Sorry, there was an error to create the note, try again!"
        );
      }
      setIsCreatingNote(false);
    },
  });

  const handleClick = () => {
    setErrorMessage(undefined);
    mutate({ title: "Default title", content: "Default content" });
    setIsCreatingNote(true);
  };

  return (
    <div
      className="overlay opacity-transition"
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div
        style={{
          display: show ? "flex" : "none",
        }}
        className="modal-menu"
      >
        <h3 className="subtitle">Create a new route</h3>
        <p>{errorMessage}</p>
        <Form fields={{}} onSubmit={handleClick}>
          <Input
            label="Route name:"
            name="name"
            errors={{
              required: {
                value: true,
                message: "name is required*",
              },
            }}
            placeholder="put a name"
            type="text"
          />
          <Input
            label="Route description:"
            name="description"
            errors={{
              required: {
                value: true,
                message: "description is required",
              },
            }}
            placeholder="put a description"
            type="text"
          />
          <Input
            label="Route start date:"
            name="startDate"
            errors={{
              required: {
                value: true,
                message: "start date is required",
              },
            }}
            placeholder="put a date"
            type="date"
          />
          <section className="button-container">
            <button
              type="submit"
              className="button --dark --bordered --full-extension"
              disabled={isCreatingNote}
            >
              {isCreatingNote ? "Creating..." : "create!"}
            </button>
            <button
              type="button"
              className="button --bordered --full-extension"
              onClick={onClose}
              disabled={isCreatingNote}
            >
              cancel
            </button>
          </section>
        </Form>
      </div>
    </div>
  );
};
export default ModalNoteMenu;
