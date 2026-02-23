import styles from "./page.module.css";

// navbar links
export default function Home() {
  return (
    <main>
      <section id="hero" className={styles.hero}>
        <h1>Albert</h1>
        <p>Computer Science & Psychology @ UNSW</p>
      </section>

      <section id="about" className={styles.section}>
        <h2>About</h2>
        <p>About section coming soon.</p>
      </section>

      <section id="experience" className={styles.section}>
        <h2>Experience</h2>
        <p>Experience section coming soon.</p>
      </section>

      <section id="projects" className={styles.section}>
        <h2>Projects</h2>
        <p>Projects section coming soon.</p>
      </section>
    </main>
  );
}