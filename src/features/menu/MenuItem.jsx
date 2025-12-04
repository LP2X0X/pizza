function MenuItem({ pizza }) {
  return (
    <article>
      <h3>{pizza.name}</h3>
      <img src={pizza.imageUrl} alt={`Image of a ${pizza.name} pizza`} />
      <p>{pizza.ingredients.join(", ")}</p>
      {pizza.soldOut ? <p>Sold out</p> : <p>{pizza.unitPrice}</p>}
    </article>
  );
}

export default MenuItem;
