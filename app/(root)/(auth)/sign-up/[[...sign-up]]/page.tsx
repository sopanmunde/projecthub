// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//    <div className="flex sm:min-h-[71vh] items-center justify-center">
//     <SignUp/>
//    </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { Label } from "@/components/auth/ui/sign-up/lable";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
import { Input } from "@/components/auth/ui/sign-up/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/appform/ui/select";

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const [selectedColleges, setSelectedColleges] = useState("Select your college name")
  const Colleges = [
    "Select your college name",
    "PES College of Engineering, Chatrapati Sambhajinagr",
    "Govt. College of Engineering, Chatrapati Sambhajinagar",
    "Govt. College of Engineering, Chtarapati Sambhajinagar",
    "PES College Of Polytechnic, Chatrapati Sambhajinagar",
  ]
  const [selectedDepartments, setSelectedDepartments] = useState("")
  const Departments = [
    "Select your departments name",
    "Computer Science",
    "Computer Science & Engineering",
    "Civil Enigineering",
    "Eletrical Engineering",
    "Electronics & Computer Science",
    "Mechanical Engineering",
    "Data Science",
    "Artificial Intellingence",
  ]

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to ProMan
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to ProMan if you can because we don&apos;t have a login flow
        yet
      </p>
      {/* <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" /> */}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          {/* <div className="flex flex-col space-y-4"> */}
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />


        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Enter first name" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Enter last name" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="proman87@gmail.com" type="email" />
        </LabelInputContainer>

        <div className="space-y-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="year-of-Phase-select" className="font-medium flex items-center">
              <BookOpen className="mr-8 h-4 w-6 text-muted-foreground" />
              College:
            </Label>
            {/* <Label htmlFor="college">College:</Label> */}
            <Select value={selectedColleges} onValueChange={setSelectedColleges}>
              <SelectTrigger id="College Selected" className="w-full md:w-[280px]">
                <SelectValue placeholder="Select your college name" />
              </SelectTrigger>
              <SelectContent>
                {Colleges.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </LabelInputContainer>
        </div>
        {/* </LabelInputContainer> */}
        <div className="space-y-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="year-of-Phase-select" className="font-medium flex items-center">
              <BookOpen className="mr-8 h-4 w-6 text-muted-foreground" />
              Departmet:
            </Label>
            {/* <Label htmlFor="college">Departments:</Label> */}
            <Select value={selectedDepartments} onValueChange={setSelectedDepartments}>
              <SelectTrigger id="Departments Selected" className="w-full md:w-[280px]">
                <SelectValue placeholder="Select your Department" />
              </SelectTrigger>
              <SelectContent>
                {Departments.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Conform your password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
