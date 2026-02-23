import "./globals.css";

// setting metadata for titles/previews
export const metadata = {
  title: "Albert | Portfolio",
  description: "Computer Science & Psychology @ UNSW",
};

// contents

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}