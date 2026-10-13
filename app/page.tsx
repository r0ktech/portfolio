import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ProjectGrid from "@/components/ProjectGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import GitHubActivity from "@/components/GitHubActivity";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <ProjectGrid />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
