import useLocationData from "../../hooks/useLocationData";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ROUTES from "../../consts/routes";
import { useQuery } from "react-query";
import CACHE_KEYS from "../../consts/cache-keys";

import { LeftOutlined } from "@ant-design/icons";
import BlockLink from "../../components/BlockLink";
import "./styles/editor-note-styles.css";
import useTitle from "../../hooks/useTitle";
import { getRouteById } from "../../services/routeService";
import { RouteGetResponse } from "../../models/routeMode";
import StopSelectorList from "../../components/forms/StopSelectorList";

interface EditorNoteProps {
  route?: RouteGetResponse;
}

const EditorNote = ({ route }: EditorNoteProps) => {
  const { data: noteData, isDataPassed } = useLocationData<RouteGetResponse>(
    "route",
    route || {
      id: 1,
      name: "loading...",
      description: "loading...",
      startDate: "",
      routeStop: [],
    }
  );
  const { id } = useParams();
  const [errorStatus, setErrorStatus] = useState(0);
  const [errorCode] = useState<string | undefined>(undefined);
  const [routeName, setRouteName] = useState("");

  useEffect(() => {
    window.history.replaceState({}, "", ROUTES.ROUTES.EDITORID(Number(id)));
  }, [id]);

  useTitle(noteData.name);

  const { isError, isLoading } = useQuery({
    queryKey: [CACHE_KEYS.NOTE],
    queryFn: () => {
      if (!isDataPassed) {
        return getRouteById(Number(id));
      }
      return Promise.resolve(undefined);
    },
    onSuccess: (res) => {
      if (!res) return;

      setRouteName(res.data.name);
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
        to={ROUTES.ROUTES.ME}
        testId="back-button"
      >
        <LeftOutlined />
      </BlockLink>
      {(!isDataPassed && isError) || errorCode ? (
        <span>Note not found</span>
      ) : (
        <div className="editor-grid">
          {isLoading && (
            <h3 className="gradient-title --small-title">loading...</h3>
          )}
          <h3 className="gradient-title --small-title">
            {isDataPassed ? noteData.name : routeName}
          </h3>

          <StopSelectorList />
        </div>
      )}
      {!isDataPassed && isError && errorStatus === 500 && (
        <span>Hubo un error, ¿reintentar?</span>
      )}
    </div>
  );
};
export default EditorNote;
