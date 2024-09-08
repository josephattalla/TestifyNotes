import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TestifyNotes",
  description: "Upload your notes, get a curated practice exam in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="relative h-full w-full bg-slate-950">
      <body className={`${inter.className} absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]`}>
        {children}
      </body>
    </html>
  );
}