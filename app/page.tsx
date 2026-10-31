import SiteNav from "@/components/SiteNav";
import Intro from "@/components/Intro";
import SelectedWork from "@/components/SelectedWork";
import Experiments from "@/components/Experiments";
import Showreel from "@/components/Showreel";
import AboutSection from "@/components/AboutSection";
import WorkExperience from "@/components/WorkExperience";
import GitHubActivity from "@/components/GitHubActivity";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Intro />
        <SelectedWork />
        <Experiments />
        <Showreel />
        <AboutSection />
        <WorkExperience />
        <GitHubActivity />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
