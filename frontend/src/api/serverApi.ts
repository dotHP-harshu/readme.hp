import axios from "axios";

const SERVER_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

type Methods = "GET" | "POST";

interface ApiResponseInterface<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ResponseInterface<T> {
  data: T | null;
  error: string | null;
}

const request = async <T>(
  method: Methods,
  url: string,
  data: any = null,
  abort?: AbortController
): Promise<ResponseInterface<T>> => {
  console.log({ url, method });
  try {
    const res = await api<ApiResponseInterface<T>>({
      method,
      data,
      url,
      signal: abort?.signal,
    });
    console.log(res);
    if (res.data.success) {
      return { data: res.data.data, error: null };
    }
    return { data: null, error: `Unexpected error: ${res.data.message}` };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "CanceledError") {
        return { data: null, error: "Request aborted" };
      }
      return { data: null, error: error.message };
    }
  }
  return { data: null, error: "Something went wrong.." };
};

export const getRepoContentApi = async (
  fileArray: string[],
  username: string,
  repo: string,
  branch: string
) =>
  await request<object>("POST", "/github/content", {
    fileArray,
    username,
    repo,
    branch,
  });

let abortGetReadme: AbortController | undefined;
export const getReadmeApi = (content: string[]) => {
  const blob = new Blob([JSON.stringify(content)], {
    type: "application/json",
  });
  const formData = new FormData();
  formData.append("file", blob, "codebase.json");
  abortGetReadme = new AbortController();
  return request<object>("POST", "/ai/readme", formData, abortGetReadme);
};
export const abortGetReadmeApi = () => {
  abortGetReadme?.abort();
};
