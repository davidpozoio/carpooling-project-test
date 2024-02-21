import { useQuery } from "react-query";
import RouteCard from "./RouteCard";
import ModalNoteMenu from "./ModalNoteMenu";
import useToggle from "../../../hooks/useToggle";
import CACHE_KEYS from "../../../consts/cache-keys";
import { useAppStore } from "../../../store/store";
import { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import "../styles/note-list-styles.css";
import useTitle from "../../../hooks/useTitle";
import { getRoutes } from "../../../services/routeService";
import ModalStopsMenu from "./ModalStopsMenu";
import { RouteGetResponse } from "../../../models/routeMode";

interface NoteListProps {
  trashBean?: boolean;
}

const NoteList = ({ trashBean }: NoteListProps) => {
  const { toggle, setTrue, setFalse } = useToggle(false);
  const stopsModalMenu = useToggle(false);
  const isCreatingNote = useAppStore((state) => state.isCreatingNote);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedRoute, setSelectedRoute] = useState<
    RouteGetResponse | undefined
  >(undefined);
  useTitle(trashBean ? "trash note list" : "note list");

  const {
    data: routes,
    refetch,
    isLoading,
  } = useQuery(
    [
      CACHE_KEYS.NOTE_LIST.ME,
      trashBean ? CACHE_KEYS.NOTE_LIST.TRASH : CACHE_KEYS.NOTE_LIST.NORMAL,
    ],
    () => getRoutes(!!trashBean).then((res) => res.data),
    {
      onError: (err) => {
        const error = err as { response: { status: number } };
        if (error?.response?.status === 500) {
          setError(
            "Lo sentimos, hubo un error al obtener las rutas, ¡inténtalo de nuevo!"
          );
        }
      },
      onSuccess: () => {
        setError(undefined);
      },
    }
  );

  const addNote = () => {
    setTrue();
  };

  const handleClose = () => {
    setFalse();
  };

  return (
    <div className="--main-content note-grid">
      <ModalStopsMenu
        show={stopsModalMenu.toggle}
        onClose={() => stopsModalMenu.setFalse()}
        stops={selectedRoute?.routeStop}
      />
      <ModalNoteMenu
        show={(toggle && !trashBean) || (isCreatingNote && !trashBean)}
        onClose={handleClose}
      />
      <h2 className="gradient-title --medium-title note-list-title">
        {trashBean ? "Todas las rutas" : "Mis rutas"}
      </h2>
      {routes?.length === 0 && (
        <span>
          {trashBean ? "Papelera vacia" : "Aún no hay rutas, ¡crea una!"}
          <img
            className="no-notes-draw"
            src="/no-notes-draw.svg"
            alt="without notes image"
          />
        </span>
      )}
      {error && (
        <>
          <span>{error}</span>
          <button onClick={() => refetch()} disabled={isLoading}>
            Reload notes
          </button>
        </>
      )}
      <section className="note-list">
        {routes?.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            trashBean={!!trashBean}
            onClick={() => {
              console.log("click on route card");
              setSelectedRoute(route);
              stopsModalMenu.setTrue();
            }}
          />
        ))}
      </section>

      {isLoading && (
        <span className="loading-overlay">
          <LoadingOutlined style={{ fontSize: "30px" }} />
          Recibiendo notas...
        </span>
      )}

      {!trashBean && (
        <button
          className="add-note-button"
          data-testid="add-note"
          onClick={addNote}
        >
          <PlusOutlined style={{ fontSize: "20px" }} />
        </button>
      )}
    </div>
  );
};
export default NoteList;
