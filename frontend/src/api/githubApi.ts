import axios from "axios";

interface RepoTreeResponseInterface {
  data: object | null;
  error: string | null;
}

export const getRepoTreeApi = async (
  repoUrl: string
): Promise<RepoTreeResponseInterface> => {
  const githubRepoRegex =
    /^https?:\/\/(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^\/\s]+))?(?:\/|$)/;
  let match = repoUrl.match(githubRepoRegex);

  if (!match) return { data: null, error: "Invalid repo url." };

  let [, username, repo, branch] = match;

  if (!branch) {
    try {
      const { data: repoMeta } = await axios.get(
        `https://api.github.com/repos/${username}/${repo}`
      );
      branch = repoMeta.default_branch;
    } catch (err) {
      return { data: null, error: "Failed to fetch default branch." };
    }
  }

  try {
    const data = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/git/trees/${branch}?recursive=1`
    );
    if (data.data) {
      return { data: data?.data?.tree, error: null };
    }
    return { data: null, error: "Error on getting the repo tree." };
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return { data: null, error: err.message || "Error on getting the repo tree (catched)." };
  }
};
