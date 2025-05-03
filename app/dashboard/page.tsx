import { SessionNavBar } from "@/components/ui/sidebar";
import { UserButton, UserProfile } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen flex-row">
    <SessionNavBar />
    <main className="flex h-screen grow flex-col overflow-auto">
    </main>
    </div>
  );
}
