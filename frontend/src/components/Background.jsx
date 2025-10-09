import Container from "./Container";

const Background = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                 bg-gradient-to-br from-[#23094d] via-[#6b21a8] to-black 
                 text-white px-4 py-10"
    >
      {/* Header
      <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-400 to-purple-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
        🔗 JMI URL Shortener
      </h1> */}

      {/* Glass Container */}
      <div
        className="w-full max-w-5xl rounded-2xl p-8 md:p-10 
                   shadow-2xl bg-white/10 backdrop-blur-lg 
                   border border-white/10 hover:border-purple-400/30 
                   transition-all duration-300"
      >
        <Container />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} URL Shortener -  Built with React & Tailwind
      </footer>
    </div>
  );
};

export default Background;
