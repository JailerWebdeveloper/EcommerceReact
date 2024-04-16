import axios from "axios";
export const handleSubscribir = async (dataform) => {
    const requestBody = { dataform };
    try {
      const response = await axios.post(
        `https://backend-wolf.vercel.app/Creacion/factura`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to create factura");
      }
      const data = response.data;
      const facturaLink = data;
      return facturaLink;
    } catch (error) {
      console.error("Error al intentar comprar:", error);
    }
    
  };
  