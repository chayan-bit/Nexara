import "./index.css";
import "./sections.css";
import "./premium.css";
import "./screens.css";
import { Grain } from "./components/Grain";
import { Nav } from "./components/Nav";
import { Marquee } from "./components/Marquee";
import { Hero } from "./sections/Hero";
import { Vision } from "./sections/Vision";
import { Personas } from "./sections/Personas";
import { Brand } from "./sections/Brand";
import { Components } from "./sections/Components";
import { Screens } from "./sections/Screens";
import { Foundations } from "./sections/Foundations";
import { CtaBand } from "./sections/CtaBand";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Vision />
        <Personas />
        <Brand />
        <Components />
        <Screens />
        <Foundations />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
