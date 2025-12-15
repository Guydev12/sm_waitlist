import logo from "../assets/logo.png";
import TripleLines from "./TripleLines";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-10 w-full flex flex-row  items-center bg-amber-50 ">
      <div>
        <img
          alt="logo salon de motivation"
          src={logo}
          className="w-40 bg-transparent"
        />
      </div>
      <div className="w-[200px] ">
        <p className="font-bold text-2xl w-full ">Salon des Jeunes</p>
        <TripleLines />
      </div>
    </header>
  );
}
