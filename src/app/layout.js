export const metadata = {
  title: "SpaceMK 🚀",
  description: "Milkyway Knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Voeg de Google Fonts link toe */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
      </head>
      <body style={{ backgroundColor: "#141A26", color: "white", margin: 0, fontFamily: "'Roboto', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
