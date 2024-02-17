import { Link } from "react-router-dom";
import { useAppStore } from "../store/store";
import { ReactNode } from "react";

interface BlockLinkProps {
  to: string;
  children: string | ReactNode;
  className?: string;
  testId?: string;
}

const BlockLink = ({ to, children, className, testId }: BlockLinkProps) => {
  const blockLinks = useAppStore((state) => state.blockLinks);
  return (
    <Link
      to={blockLinks ? "#" : to}
      className={blockLinks ? "disable-link " + className : className}
      data-testid={testId}
    >
      {children}
    </Link>
  );
};
export default BlockLink;
