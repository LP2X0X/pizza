import { useLoaderData } from "react-router";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <div>
      {menu.map((item) => (
        <MenuItem pizza={item} />
      ))}
    </div>
  );
}

export default Menu;

export async function loader() {
  try {
    const res = await fetch("http://localhost:9000/menu");

    if (!res.ok) throw new Error("Failed to fetch pizzas data...");

    const menu = await res.json();

    return menu;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
