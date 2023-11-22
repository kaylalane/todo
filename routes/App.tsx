import { Suspense } from "react";
import ToDo from "../components/Todo";
import Navbar from "../components/Navbar";

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className=" min-h-screen flex">
        <Navbar />
        <ToDo />
      </div>
    </Suspense>
  );
}
