import { SignUp } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up || ZCRUM - Your very own project manager",
  description:
    "Sign up for a ZCRUM account to start managing your projects and collaborating with your team.",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
