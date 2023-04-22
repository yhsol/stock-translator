import { DartQueryParams } from "@/pages/api/dart";
import axios from "axios";

export const sendRequestToGPT = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      "/api/chat",
      { prompt },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    return data.result || "No answer found";
  } catch (error) {
    console.error(error);
    return "No answer found";
  }
};

export const getDataFromDart = async (params: DartQueryParams) => {
  try {
    const response = await axios.get("/api/dart", { params });
    return response.data || "No data found";
  } catch (error) {
    console.error(error);
    return "No data found";
  }
};
