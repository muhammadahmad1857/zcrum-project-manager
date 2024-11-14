import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28  text-gray-300">
      <div className="w-full lg:w-1/2">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt=""
        />
        <img
          className="hidden md:block lg:hidden"
          src="https://i.ibb.co/c1ggfn2/Group-193.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-200">
          Looks like you&apos;ve found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base text-gray-400">
          The content you&apos;re looking for doesn&apos;t exist. Either it was
          removed, or you mistyped the link.
        </p>
        <p className="py-2 text-base text-gray-400">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Link href={"/"}>
          <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">
            Go back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
