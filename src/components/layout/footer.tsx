export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-sm">
            © 2024 Farsight • Built for the Farcaster community
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-all duration-200 text-sm hover:scale-105"
            >
              @farsight
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-all duration-200 text-sm hover:scale-105"
            >
              fc://@farsight
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
