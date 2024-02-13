import ROUTES from "../../consts/routes";
import BlockLink from "../../components/BlockLink";

const Home = () => {
  return (
    <>
      <section>
        <h1>Blocky</h1>
        <p>Create and read your notes in a single app</p>
        <BlockLink to={ROUTES.AUTH.LOGIN}>Get started!</BlockLink>
      </section>
    </>
  );
};
export default Home;
