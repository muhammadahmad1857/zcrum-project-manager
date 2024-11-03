import Link from "next/link";
import React from "react";
const Footer = () => {
  return (
    <section className="bg-gray-900">
      <div className="w-full h-[1px]   bg-gray-200 mt-12"></div>
      <footer className="flex container mx-auto justify-between max-sm:flex-col text-center items-center   gap-8 max-sm:px-4 p-10">
        <p>
          Made with ❤️ by{" "}
          <Link
            href={"https://github.com/muhammadahmad1857"}
            className="relative font-bold before:absolute before:-bottom-1 before:right-0 before:w-0 before:transition-all before:duration-500 hover:before:w-full before:h-[2px] before:bg-slate-300"
            target="_blank"
          >
            Muhammad Ahmad
          </Link>
        </p>
        <div className="flex items-center gap-8 ">
          <Link
            target="_blank"
            href={"https://github.com/muhammadahmad1857"}
            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
          >
            <svg
              className="fill-black z-10 transition-all duration-300 group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>

            <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
          </Link>
          <Link
            target="_blank"
            href={"https://linkedin.com/in/muhammadAhmadJawad"}
            className="w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300"
          >
            <svg
              className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z"
                fill=""
              />
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#006699] z-0 transition-all duration-500 group-hover:top-0"></div>
          </Link>
          <Link
            target="_blank"
            href={"https://youtube.com/@code-with-ahmad2009?sub_confirmation=1"}
            className="w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300"
          >
            <svg
              className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M61.1026 23.7185C60.5048 21.471 58.7363 19.6981 56.4863 19.0904C52.4181 18 36.0951 18 36.0951 18C36.0951 18 19.7805 18 15.7039 19.0904C13.4622 19.6897 11.6937 21.4627 11.0876 23.7185C10 27.7971 10 36.3124 10 36.3124C10 36.3124 10 44.8276 11.0876 48.9063C11.6854 51.1537 13.4539 52.9267 15.7039 53.5343C19.7805 54.6247 36.0951 54.6247 36.0951 54.6247C36.0951 54.6247 52.4181 54.6247 56.4863 53.5343C58.728 52.935 60.4965 51.162 61.1026 48.9063C62.1902 44.8276 62.1902 36.3124 62.1902 36.3124C62.1902 36.3124 62.1902 27.7971 61.1026 23.7185Z"
                fill=""
              />
              <path
                className="fill-white transition-all duration-300 group-hover:fill-[#FF3000]"
                d="M30.8811 44.1617L44.4392 36.3124L30.8811 28.463V44.1617Z"
                fill="white"
              />
            </svg>
            <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#FF3000] z-0 transition-all duration-500 group-hover:top-0"></div>
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
