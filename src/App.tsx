import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { WaitlistForm } from "./components/WaitlistForm";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br ">
      <Header />
      <div className="container mt-40 mx-auto px-4 py-8 max-w-4xl">
        <Toaster position="top-right" richColors />
        <WaitlistForm />
      </div>
      <Footer />
    </div>
  );
}
