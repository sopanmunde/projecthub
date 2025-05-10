import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
   <div className="flex sm:min-h-[71vh] items-center justify-center">
    <SignIn/>
   </div>
  );
}
