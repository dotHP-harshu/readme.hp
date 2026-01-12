import React from "react";
import type { fileTreeElement } from "../../types/types";

interface RepoFileItemProps {
  file: fileTreeElement;
  isChecked: boolean;
  toggleFile: (path: string) => void;
  pathColors: string[];
}

const RepoFileItem = React.memo(
  ({ file, isChecked, toggleFile, pathColors }: RepoFileItemProps) => {
    return (
      <li>
      <label htmlFor={file.path} className="flex items-stretch gap-2 relative py-2 px-4 rounded-lg hover:bg-surface-secondary-dark/5 dark:hover:bg-surface-secondary-light/5 ">
        <input
          type="checkbox"
          id={file.path}
          checked={isChecked}
          onChange={() => toggleFile(file.path)}
          className="w-4 h-4 self-center accent-blue-500 bg-bg-light dark:bg-bg-dark cursor-pointer text-green-600"
        />
        <p
          className="w-full truncate cursor-pointer peer self-center"
          title={file.path}
        >
          {file.path.split("/").map((filePart, index) => (
            <span
              key={index}
              style={{
                color:
                  pathColors[
                    index < pathColors.length
                      ? index
                      : index % pathColors.length
                  ],
              }}
            >
              /{filePart}
            </span>
          ))}
        </p>
        <small className="inline-block font-code self-center text-text-muted-light dark:text-text-muted-dark min-w-20 w-fit overflow-hidden">
          {typeof file.size === "number"
            ? file.size < 1024 * 1024
              ? `${(file.size / 1024).toFixed(2)} Kb`
              : `${(file.size / (1024 * 1024)).toFixed(2)} Mb`
            : "—"}
        </small>
      </label>
      </li>
    );
  }
);

RepoFileItem.displayName = "RepoFileItem";

export default RepoFileItem;
