import { urls } from "./urls";
import { generateHttpClient } from "./client";

export const fetchProducts = async (params) => {
  const response = await generateHttpClient().get(urls.sneaker.list, {
    params,
  });
  return response.data;
};
