import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Pulse – L’application de signalement pour une gestion rapide et efficace des incidents scolaires",
  description: "School Pulse est une application mobile dédiée aux établissements scolaires, permettant aux élèves, enseignants et personnels de signaler facilement tout incident ou dysfonctionnement (matériel cassé, panne, problème technique, etc.). Grâce à une interface simple et collaborative, les signalements sont centralisés et l'administration peut les suivre, les prioriser et les résoudre plus rapidement. Une solution moderne pour améliorer la réactivité et la qualité de vie dans les établissements scolaires."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackServerApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
