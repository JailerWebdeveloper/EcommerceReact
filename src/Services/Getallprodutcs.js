
export const GetAllProducts = async () => {
  const res = await fetch(
    `https://backend-wolf.vercel.app/Productos/todos`
  );
  console.log(res.status);
  const data = await res.json();
  console.log(data)

  return data;
};


