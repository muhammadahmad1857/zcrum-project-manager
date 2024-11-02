"use client";
import React from "react";
import companies from "@/data/companies.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const CompanyCarousel = () => {
  return (
    <Carousel
      className="w-full py-10 "
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center ">
        {companies.map(
          (company: { name: string; id: number; path: string }) => {
            return (
              <CarouselItem
                key={company.id}
                className="sm:basis-1/3 basis-1/2 lg:basis-1/6"
              >
                <Image
                  src={company.path}
                  alt={company.name}
                  width={200}
                  height={56}
                  className="h-9 sm:h-14 object-contain cursor-pointer  transition-all duration-500 hover:scale-105 "
                />
              </CarouselItem>
            );
          }
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default CompanyCarousel;
