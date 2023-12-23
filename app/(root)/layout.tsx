import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1">
        <div className="bg-gradient-to-b from-black via-black to-transparent">
          <Header />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
}
