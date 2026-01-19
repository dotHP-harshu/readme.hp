import Footer from "../components/Footer";
import DesignedFor from "../components/HomePage/DesignedFor";
import Feature from "../components/HomePage/Feature";
import HomeHero from "../components/HomePage/HomeHero";
import Limitations from "../components/HomePage/Limitations";
import WorkFlow from "../components/HomePage/WorkFlow";

function HomePage() {
  return (
    <main>
      <HomeHero />
      <WorkFlow />
      <Feature />
      <section className="w-full   px-6 bg-surface-primary-light dark:bg-surface-primary-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-2 max-sm:grid-cols-1">
          <DesignedFor />
          <Limitations />
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default HomePage;
