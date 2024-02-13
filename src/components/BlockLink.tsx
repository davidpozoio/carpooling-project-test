import { Link } from "react-router-dom";
import { useAppStore } from "../store/store";

interface BlockLinkProps {
  to: string;
  children: string;
}

const BlockLink = ({ to, children }: BlockLinkProps) => {
  const blockLinks = useAppStore((state) => state.blockLinks);
  return <Link to={blockLinks ? "#" : to}>{children}</Link>;
};
export default BlockLink;
