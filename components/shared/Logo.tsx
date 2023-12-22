import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex flex-row space-x-3 items-center">
      <p className="text-3xl font-bold text-red-500 italic">Shifter</p>
      <Image
        src="/assets/images/shifter.jpg"
        alt="shifter"
        height={18}
        width={18}
        className="invert"
      />
    </Link>
  );
}

export default Logo;
