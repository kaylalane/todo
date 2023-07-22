import { signOut } from "firebase/auth";
import { auth } from "./config";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <nav className=" bg-[#111315] basis-1/4 p-4 flex flex-col relative">
      <h1 className=" text-2xl">Do it! </h1>
 
      <button
        className=" self-start rounded-xl py-2"
        onClick={() => navigate("/")}
      >
        Dashboard
      </button>

      <button
        className=" self-start rounded-xl py-2"
        onClick={() => navigate("/calender")}
      >
        Calendar
      </button>

      <div className="  flex gap-2 mt-auto">
        <div className=" flex gap-2 ">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {auth.currentUser?.displayName?.charAt(0)}{" "}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{auth.currentUser?.displayName} </p>
            <p className=" text-sm text-slate-300">
              {auth.currentUser?.email}{" "}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            signOut(auth)
              .then(() => {
                navigate("/signin", { replace: true });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className=" text-slate-300 text-lg ml-auto"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
