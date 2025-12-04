import { useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  return (
    <div>
      <h2>There is something wrong...</h2>
      <h3>{error.status}</h3>
      {error.data ? <h3>{error.data}</h3> : <h3>{error.message}</h3>}
    </div>
  );
}

export default Error;
