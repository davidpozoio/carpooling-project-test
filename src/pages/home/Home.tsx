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
          <h1 className="gradient-title --large-title">Carpooling</h1>
          <p>Create your routes in a single app</p>
          <BlockLink className="button" to={ROUTES.AUTH.LOGIN}>
            Get started!
          </BlockLink>
          <div className="ilustration full-width">
            <img
              src="/home-draw.svg"
              className="draw"
              alt="example ilustration"
              width="400"
              height="400"
            />
            <img
              src="/wave-1.svg"
              alt="wave figure"
              className="initial-wave"
              width="800"
              height="620"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
