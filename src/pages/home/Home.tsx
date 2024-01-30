import { Link } from "react-router-dom";
import ROUTES from "../../consts/routes";

const Home = () => {
  return (
    <>
      <section>
        <h1>Blocky</h1>
        <p>Create and read your notes in a single app</p>
        <Link to={ROUTES.AUTH.LOGIN}>Get started!</Link>
      </section>
    </>
  );
};
export default Home;
