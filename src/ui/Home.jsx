import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <article>
      <h1>
        The best pizza.
        <br />
        <span>Straight out of the oven, straight to you.</span>
      </h1>
      <CreateUser />
    </article>
  );
}

export default Home;
