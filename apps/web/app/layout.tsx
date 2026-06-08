import "./globals.css";
import { Shell } from "../components/shell";

export const metadata = {
  title: "AI-EFFECT Solution Studio",
  description: "Marketplace and workflow studio for AI-EFFECT services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}