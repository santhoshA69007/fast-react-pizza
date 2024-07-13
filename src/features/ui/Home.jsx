import CreateUser from "../User/CreateUser";
6;
function Home() {
  return (
    <div className="mt-10 mt-8 text-center sm:my-16 px-4">
      <h1 className="mb-8 text-xl text-center font-semibold md:text-3xl ">
        The bemenst pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
