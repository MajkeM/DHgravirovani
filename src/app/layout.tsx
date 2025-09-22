

import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";




export const metadata: Metadata = {
  title: "D.H. Gravírování",
  description: "Profesionální služby v oblasti gravírování a značení. Přesné laserové gravírování na různé materiály, rychlé a spolehlivé služby pro firmy i jednotlivce.",
};

// definice props pro layout
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {




  return (
    <html lang="cs">
      <body

      >
        <Header />s
        {children}
      </body>
    </html>
  );
}
