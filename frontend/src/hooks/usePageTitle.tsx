import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}



// export const seo = {
//   home: {
//     title: "Readme.hp – AI README Generator from GitHub Repos",
//     description:
//       "Generate clean, structured README.md files from GitHub repositories using AI.",
//   },
//   generator: {
//     title: "Generate README from GitHub – Readme.hp",
//     description:
//       "Analyze repository files and generate professional README documentation instantly.",
//   },
//   contact: {
//     title: "Contact & Feedback – Readme.hp",
//     description:
//       "Get in touch with the Readme.hp team. Share feedback or report issues.",
//   },
// };
