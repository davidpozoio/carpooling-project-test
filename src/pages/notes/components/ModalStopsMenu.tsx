import { CloseOutlined } from "@ant-design/icons";
import { RouteStop } from "../../../models/routeStopModel";
import "../styles/modal-stops-menu-styles.css";

interface ModalStopsMenuProps {
  show: boolean;
  stops?: RouteStop[];
  onClose?: () => void;
}

const ModalStopsMenu = ({ show, stops, onClose }: ModalStopsMenuProps) => {
  return (
    <div
      className="overlay opacity-transition"
      style={{
        display: show ? "flex" : "none",
      }}
    >
      <div className="menu-card">
        <header className="menu-card-header">
          <button className="button --circle --dark" onClick={onClose}>
            <CloseOutlined />
          </button>
        </header>
        <div className="stop-card-list">
          {stops?.length === 0 && <span>There are no stops</span>}
          {stops?.map((stop) => {
            return (
              <div key={stop.id} className="stop-card">
                <h3>{stop.stop.name}</h3>
                <span>{stop.stop.description}</span>
                <span>{new Date(stop.arriveHour).toDateString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ModalStopsMenu;
