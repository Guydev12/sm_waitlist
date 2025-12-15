import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-600 text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Salon de Motivation Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-lg font-semibold">Salon de Motivation</span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://web.facebook.com/profile.php?id=61583453152383"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/salondemotivation01/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@salon.de.motivati"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            TikTok
          </a>
          <a
            href="https://www.whatsapp.com/channel/0029Vb6ROdF8fewzx3ID5O12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            Channel Whatsapp
          </a>
        </div>
        <span>salondemotivation01@gmail.com</span>
        {/* Right: Rights reserved */}
        <div className="text-sm text-gray-200">
          salondemotivation © 2025 — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
