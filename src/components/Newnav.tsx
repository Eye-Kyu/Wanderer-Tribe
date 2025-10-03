import Link from "next/link";
import Image from "next/image";

export default function Newnav() {
  return (
    <nav className="bg-inherit flex justify-center items-center h-16 w-screen">
      <div className="flex flex-row items-center justify-evenly space-x-20 text-lg w-full font-thin">
        
        <Link href="/destinations">Destinations</Link>
        <Link href="/experiences">Experiences</Link>
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Wanderer logo 1.png"
            alt="wanderer-tribe-logo"
            width={100}
            height={30}
            className="object-contain"
          />
        </Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}