import Image from "next/image";

import Link from "next/link";

import Header from "./components/header";

export default function Home() {
  const content = [
    {
      image: "/images/phone and creditcard.png",
      heading: "Connect Your Phone",
      paragraph: "Securely link your phone in minutes. No bank account needed.",
    },
    {
      image: "/images/AI-powered thinking brain.png",
      heading: "AI-Powered Analysis",
      paragraph:
        "Our smart AI analyzes your digital data patterns to generate a fair credit score.",
    },
    {
      image: "/images/Secure lock and key, successfully unlocked.png",
      heading: "Unlock Loans",
      paragraph: "Securely link your phone in minutes. No bank account needed.",
    },
  ];
  return (
    <div className="text-[20px] ">
      <Header />
      <div className="lg:px-[11rem] px-4 mt-10 md:flex-row md:justify-between md:items-center flex flex-col">
        {/* div of writing */}
        <div className=" md:w[90%] w-full">
          <h1 className="font-inter font-medium text-[26px] sm:text-[32px] lg:text-[30px] leading-[1.15] tracking-normal text-[#111827] w-full lg:w-[70%] ">
            Check Credit Score Using just Digital Footprints. 
          </h1>
          <h1 className="font-inter font-medium text-[26px] sm:text-[32px] lg:text-[30px] leading-[1.15] tracking-normal text-[#111827] w-full lg:w-[70%]">
            Instant,Fair and Secured.
          </h1>
          <p className="md:w-[80%] tracking-wide mb-10 py-4">
            Instantly unlock loan status using phone number and digital behaviour.
          </p>
          <div className="flex justify-center items-center md:justify-start">
            <div>
              {" "}
              <button className="hover:-translate-y-0.5">
                <Link
                  href="/input-page"
                  className="bg-[#2D85FF] text-white px-4 py-3 rounded-lg  mr-5   "
                >
                  Check My Score
                </Link>
              </button>
              <button className="hover:-translate-y-0.5">
                <Link
                  href="#"
                  className="border border-blue-700 px-4 py-3 rounded-lg"
                >
                  Get Started
                </Link>
              </button>
            </div>
          </div>

          <p className="text-sm mt-6 ml-4 text-center md:text-start">
            Trusted by Fintechs and Micro-Lenders
          </p>
        </div>
        {/* div of image */}
        <div className="lg:w-[40%]  w-full">
          <div className="relative lg:w-[500px] lg:h-[500px] w-[100%] h-[500px] py-3  bg-[#e5e7eb]">
            <Image
            alt="ii"
              src="/images/ChatGPT Image Nov 24, 2025, 12_46_53 PM 2.png"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <h1 className="font-bold text-2xl lg:text-3xl text-center mt-4 ">
        How it works
      </h1>
      <div className="container mx-auto px-4 py-8">
        {/* Flex container: stacked by default, horizontal on large screens */}
        <div className="container mx-auto px-4 py-8">
          {/* Flex container: stacked by default, horizontal on large screens */}
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            {content.map((item, index) => (
              <div
                key={index}
                className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 mb-4 relative drop-shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.heading}
                    fill
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                  {item.heading}
                </h3>
                <p className="text-gray-600">{item.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
