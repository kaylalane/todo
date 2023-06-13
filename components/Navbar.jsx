import { signout } from "../lib/signout";

export default function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center">
      <h1 className=" text-2xl text-center">What Should Frontend Developers Be Doing Today?</h1>
      <button onClick={() => signout} className="bg-button p-4 rounded-xl text-black">
        Signout
      </button>
    </nav>
  );
}
