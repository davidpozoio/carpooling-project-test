import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../consts/routes";
import { useAppStore } from "../../../store/store";
import { useState } from "react";
import "../styles/modal-note-menu-styles.css";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import { createRoute } from "../../../services/routeService";
import { RoutePostRequest } from "../../../models/routeMode";

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
  const { mutate } = useMutation({
    mutationFn: (data: RoutePostRequest) => createRoute(data),
    onSuccess: (response) => {
      navigate(ROUTES.ROUTES.EDITORID(response.data.id), {
        state: { note: response.data.id },
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
        <h3 className="subtitle">Crea una nueva ruta</h3>
        <p>{errorMessage}</p>
        <Form
          fields={{ name: "", description: "", startDate: "" }}
          onSubmit={(data) => {
            setErrorMessage(undefined);
            console.log(data);
            mutate({
              name: data["name"],
              description: data["description"],
              startDate: "2024-28-01",
            });
            setIsCreatingNote(true);
          }}
        >
          <Input
            label="Nombre de ruta:"
            name="name"
            errors={{
              required: {
                value: true,
                message: "el nombre es requerido*",
              },
            }}
            placeholder="Pon un nombre"
            type="text"
          />
          <Input
            label="Descripción:"
            name="description"
            errors={{
              required: {
                value: true,
                message: "la descripción es requerida*",
              },
            }}
            placeholder="Pon una descripción"
            type="text"
          />
          <Input
            label="Fecha de inicio:"
            name="startDate"
            errors={{
              required: {
                value: true,
                message: "la fecha es requerida*",
              },
            }}
            placeholder="pon una fecha"
            type="date"
          />
          <section className="button-container">
            <button
              type="submit"
              className="button --dark --bordered --full-extension"
              disabled={isCreatingNote}
            >
              {isCreatingNote ? "Creating..." : "crear!"}
            </button>
            <button
              type="button"
              className="button --bordered --full-extension"
              onClick={onClose}
              disabled={isCreatingNote}
            >
              cancelar
            </button>
          </section>
        </Form>
      </div>
    </div>
  );
};
export default ModalNoteMenu;
