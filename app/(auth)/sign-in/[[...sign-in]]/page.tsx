import { SignIn } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In || ZCRUM - Your very own project manager",
  description:
    "Sign in to your ZCRUM account to access your projects and collaborate with your team.",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
