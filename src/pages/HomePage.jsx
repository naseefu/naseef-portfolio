import About from "../components/About";
import Experience from "../components/Experience";
import Expertise from "../components/Expertise";
import FavStack from "../components/FavStack";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Motivation from "../components/Motivation";
import PageTransition from "../components/PageTransition";
import Work from "../components/Work";


export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Work />
      <Motivation />
      <Experience/>
      <Expertise />
      <FavStack />
      <About />
      <Footer />
    </PageTransition>
  )
}