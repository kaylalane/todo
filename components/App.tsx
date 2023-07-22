import { Suspense } from "react";
import ToDo from "./Todo";
import Navbar from "./Navbar";

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className=" w-screen h-screen flex">
        <Navbar />
        <ToDo />
      </div>
    </Suspense>
  );
}
