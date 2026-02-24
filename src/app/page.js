import styles from "./page.module.css";
import PiAnimation from "@/components/PiAnimation/PiAnimation";
import TypingText from "@/components/TypingText/TypingText";

const skills = [
  { category: "Languages", items: ["Python", "C", "JavaScript", "TypeScript"] },
  { category: "Frameworks", items: ["React", "Next.js"] },
  { category: "Tools", items: ["Git", "VS Code"] },
];

const projects = [
  {
    title: "SpaceX Launch Tracker",
    description:
      "Interactive 3D globe visualising SpaceX mission data — launch sites, trajectories, and mission outcomes.",
    tags: ["React", "Three.js", "REST API"],
    status: "In Progress",
  },
];

export default function Home() {
  return (
    <main>
      {/* -------- HERO -------- */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.greeting}>Hi, I'm</p>
          <h1 className={styles.name}>Albert</h1>
          <p className={styles.tagline}>
            <TypingText text="CS & Psychology @ UNSW." />
          </p>
          <div className={styles.cta}>
            <a href="#projects" className={styles.ctaPrimary}>
              See my work
            </a>
            <a href="https://github.com/alb6rt" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              GitHub
            </a>
          </div>
        </div>
        <div className={styles.heroAnimation}>
          <PiAnimation />
        </div>
      </section>

      {/* -------- ABOUT -------- */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.bio}>
          I am currently a <strong>second-year undergraduate student</strong> at <strong>UNSW</strong> studying <strong>Computer Science</strong> and <strong>Psychology</strong>. Right now I&#39;m focused on building software applications to compliment my studies and satiate my curiosity.
        </p>

        <div className={styles.skillsGrid}>
          {skills.map((group) => (
            <div key={group.category} className={styles.skillGroup}>
              <h3 className={styles.skillCategory}>{group.category}</h3>
              <div className={styles.skillTags}>
                {group.items.map((item) => (
                  <span key={item} className={styles.skillTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </section>

      {/* -------- EXPERIENCE -------- */}
      <section id="experience" className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.experiencePlaceholder}>
          <p>in progress — check back soon.</p>
        </div>
      </section>

      {/* -------- PROJECTS -------- */}
      <section id="projects" className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.projectCard}>
              <div className={styles.projectThumbnail}>
                <span className={styles.projectStatus}>{project.status}</span>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>
                {project.description}
              </p>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------- FOOTER -------- */}
      <footer className={styles.footer}>
        <p className={styles.footerCopy}>
          &copy; {new Date().getFullYear()} Built and Designed by Albert Luu. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/alb6rt" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/albertluu4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:dev.albertluu@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  );
}