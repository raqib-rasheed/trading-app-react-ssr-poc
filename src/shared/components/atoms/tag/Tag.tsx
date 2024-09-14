import { ReactNode } from "react";
import clsx from "clsx";

import "./Tag.scss";

export interface ITagProps {
  children: ReactNode;
  variant?: "success" | "warn" | "error";
}

const Tag: React.FC<ITagProps> = ({ children, variant = "success" }) => {
  return <span className={clsx("tag", `tag--${variant}`)}>{children}</span>;
};

export default Tag;
