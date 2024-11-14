import CompanyCarousel from "@/components/company-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowRight,
  BarChart,
  Calendar,
  ChevronRight,
  Layout,
  LucideProps,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ForwardRefExoticComponent } from "react";
import { RefAttributes } from "react";
import faqs from "@/data/faqs.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page || ZCRUM - Your very own project manager",
  description:
    "Discover how ZCRUM can streamline your workflow and enhance team collaboration with its intuitive project management features.",
};

export default function Home() {
  interface FAQ {
    question: string;
    answer: string;
  }

  interface Feature {
    title: string;
    description: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }

  const features: Feature[] = [
    {
      title: "Intuitive Kanban Boards",
      description:
        "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
      icon: Layout,
    },
    {
      title: "Powerful Sprint Planning",
      description:
        "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
      icon: Calendar,
    },
    {
      title: "Comprehensive Reporting",
      description:
        "Gain insights into your team's performance with detailed, customizable reports and analytics.",
      icon: BarChart,
    },
  ];

  return (
    <div className="min-h-screen min-w-screen">
      {/* hero section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline your workflow <br />{" "}
          <span className="flex mx-auto gap-3 pt-2 sm:gap-4 items-center">
            With{" "}
            <Image
              src={"/logo2.png"}
              alt="Zcrum"
              width={400}
              height={80}
              className="h-12 sm:h-24 pt-2 w-auto object-contain"
            />
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Empower your team with our intuitive project management solution
        </p>
        <div className="flex max-sm:flex-col gap-2 items-center justify-center px-8 w-full">
          <Link href={"/onboarding"} className="max-sm:w-full">
            <Button size={"lg"} className="w-full">
              Get started <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href={"#features"} className="max-sm:w-full">
            <Button variant={"outline"} className="w-full" size={"lg"}>
              Learn More <ArrowDown size={18} />
            </Button>
          </Link>
        </div>
      </section>
      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature: Feature, index) => {
              return (
                <Card
                  key={index}
                  className="bg-gray-800 hover:bg-transparent transition-all hover:scale-105 duration-500 hover:border-2 cursor-pointer hover:border-gray-800 "
                >
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className=" py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />{" "}
        </div>
      </section>
      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq: FAQ, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
      <section className=" py-20 text-center px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 ">
            Ready to Transform Your Workflow?
          </h3>
          <p className="mb-12 text-xl">
            Join thousands of teams already using ZCRUM to streamline their
            projects and boost productivity.
          </p>
          <Link href={"/onboarding"}>
            <Button size={"lg"} className="animate-bounce p-5">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
