import Menu from "./menu";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Menu />
      <div className="flex-1">{children}</div>
    </div>
  );
}
