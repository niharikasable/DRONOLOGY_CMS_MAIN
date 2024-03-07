import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div className="border border-red-500 bg-[#BBBAFE] mb-5">
        <div className="flex justify-center items-center mt-3">
          <Image src="/Group.png" alt="bodyframe" height={100} width={100} />
        </div>
        <div className="flex justify-center items-center border border-red-700 mt-2 mb-4 ">
          <Image src="/Tanwish.png" alt="bodyframe" height={170} width={170} />
        </div>
        {/* <h1 className="sm:text-3xl text-xl flex items-center justify-center title-font font-medium text-gray-900 mt-4 mb-4 border border-red-700 w-[100%] bg-purple-300">
          TANWISH
        </h1> */}
      </div>
      <div className="border border-red-500 flex justify-center items-center ">
        <div className="flex gap-12">
        <Button asChild>
            <Link href="/patientdetails">Patient Details</Link>
          </Button>
          <Button asChild>
            <Link href="/femalefert">Female Fertility</Link>
          </Button>
          <Button asChild>
            <Link href="/malefert">Male Fertility</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
