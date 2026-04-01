import "./globals.css";

export const metadata = {
  title: "Hawking Bros",
  description: "HB Found Landing on Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
