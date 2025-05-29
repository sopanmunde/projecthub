import { Card, CardContent, CardHeader, CardTitle } from "@/components/appform/ui/card";

export function WelcomeSection() {
  const studentName = "MUNDE SOPAN BALKRUSHNA"; // Hardcoded for now

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Student Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          Welcome, <span className="font-semibold text-accent-foreground">{studentName}</span>!
        </p>
        <p className="text-sm text-muted-foreground">
          Manage your projects, group members, and submissions all in one place.
        </p>
      </CardContent>
    </Card>
  );
}
