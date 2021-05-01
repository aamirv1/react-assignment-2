import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Posts({ path }) {
  const url = `https://jsonplaceholder.typicode.com/photos/8`;
  const [product, setProduct] = useState(null);

  let content = null;

  useEffect(() => {
    axios.get(url).then((response) => {
      setProduct(response.data);
    });
  }, [url]);

  if (product) {
    content = (
      <div>
        <h1>{product.title}</h1>
        <img src={product.url} alt={product.thumbnailUrl} />
      </div>
    );
  }
  return <div>{content}</div>;
}
