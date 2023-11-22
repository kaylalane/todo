import { Suspense } from "react";
import ToDo from "../components/Todo";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" scroll-view">
      <Navbar />
      <main className="main-view">{children}</main>
    </div>
  );
}
