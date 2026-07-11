import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Smart CRM Importer",
};

export default function Page() {
  return <HomeClient />;
}