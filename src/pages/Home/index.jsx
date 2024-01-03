import React, { useEffect, useState } from "react";
import { getAllProduct, getImageDog } from "../../services/ProductApi";

export default function Home() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchAllDog() {
      const response = await getImageDog();
      if (response) {
        console.log(response);
      }
    }
    fetchAllDog();
  }, []);
  return (
    <div className="home-page">
      <div className="grid grid-cols-5 gap-x-3"></div>
    </div>
  );
}
