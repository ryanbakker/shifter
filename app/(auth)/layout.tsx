import AuthCarousel from "@/components/shared/AuthCarousel";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center md:justify-center flex-col md:flex-row">
      <div className="flex items-center w-screen justify-center flex-1 bg-slate-800 min-h-screen">
        {children}
      </div>

      <AuthCarousel />
    </div>
  );
};

export default Layout;
