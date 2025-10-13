import Container from "../components/Container";

const Background = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
                 bg-gradient-to-br from-[#23094d] via-[#6b21a8] to-black
                 text-white px-4 py-10 sm:px-6 md:px-8"
    >
      <div
        className="w-full max-w-full sm:max-w-3xl md:max-w-5xl rounded-2xl 
                   p-6 sm:p-8 md:p-10 shadow-2xl bg-white/10 backdrop-blur-lg
                   border border-white/10 hover:border-purple-400/30 
                   transition-all duration-300"
      >
        <Container />
      </div>

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} URL Shortener - Built with React & Tailwind
      </footer>
    </div>
  );
};

export default Background;
