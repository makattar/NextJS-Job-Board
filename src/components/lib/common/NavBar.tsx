import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Job Board Logo"></Image>
          <span className="text-xl font-bold tracking-tight">Job Board</span>
        </Link>
        <Button asChild>
          <Link href={"/jobs/create"}>Post job</Link>
        </Button>
      </nav>
    </header>
  );
}
