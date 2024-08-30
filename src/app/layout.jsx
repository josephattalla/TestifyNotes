import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TestifyNotes",
  description: "Upload your notes, get a curated practice exam in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overscroll-none`}>
        {children}
      </body>
    </html>
  );
}
