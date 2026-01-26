import Background from "../components/background";
import Navbar from "../components/navbar/navbarSwitcher";
import Hero from "../components/hero";
import MainSection from "../components/mainSection";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Background>
        {/* Navbar switcher */}
        <Navbar />
        <Hero />
      </Background>
      <MainSection />
      <Footer />
    </>
  );
}
