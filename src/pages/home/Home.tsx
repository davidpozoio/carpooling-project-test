import ROUTES from "../../consts/routes";
import BlockLink from "../../components/BlockLink";
import "./styles/home-styles.css";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("home");

  return (
    <>
      <section className="content-grid">
        <div className="center-content content-home">
          <h1 className="gradient-title --large-title">Empieza tus viajes ya</h1>
          <p></p>
          <BlockLink className="button" to={ROUTES.AUTH.LOGIN}>
            Iniciar Sesión
          </BlockLink>
          <div className="ilustration full-width">
            <img
              src="/car.svg"
              className="draw"
              alt="example ilustration"
              width="400"
              height="400"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
