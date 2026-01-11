import axios from "axios";

const SERVER_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

type Methods = "GET" | "POST";

interface ApiResponseInterface<T> {
    success:boolean
    message:string,
    data: T | null
}

interface ResponseInterface<T> {
  data: T | null;
  error: string | null;
}

const request = async <T>(
  method: Methods,
  url: string,
  data:any = null
): Promise<ResponseInterface<T>> => {
    console.log({url,method})
  try {
    const res = await api<ApiResponseInterface<T>>({ method, data, url });
    if (res.data.success) {
      return { data: res.data.data, error: null };
    }
    return { data: null, error: `Unexpected error: ${res.data.message}` };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
  }
  return { data: null, error: "Something went wrong.." };
};

export const getRepoContentApi = async (
  fileArray: string[], username:string, repo:string, branch:string
) => await request<object>("POST", "/github/content", {fileArray, username, repo, branch});
