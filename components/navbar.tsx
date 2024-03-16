import Link from "next/link";
import React from "react";
import Image from "next/image";

const navigation = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Employees",
    path: "/employees",
  },
];

export default function Navbar() {
  return (
    <nav className="h-screen p-5 ml-5 mt-5  rounded-xl basis-1">
      <Link href="/">
        <Image
          alt="big brother"
          src="/not_propaganda.jpg"
          width="100"
          height="100"
        />
      </Link>
      <ul>
        {navigation.map((nav) => (
          <li key={nav.name}>
            <Link href={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
