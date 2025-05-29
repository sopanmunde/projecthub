import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlagiarismResultDisplayProps {
  originalityReport: string;
  improvedAbstract: string;
}

export function PlagiarismResultDisplay({ originalityReport, improvedAbstract }: PlagiarismResultDisplayProps) {
  return (
    <div className="mt-4 space-y-4">
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="text-lg">Originality Report</CardTitle>
          <CardDescription>Analysis of the provided abstract for potential plagiarism.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <p className="text-sm whitespace-pre-wrap">{originalityReport}</p>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="text-lg">Improved Abstract</CardTitle>
          <CardDescription>Suggestions to enhance clarity, conciseness, and originality.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <p className="text-sm whitespace-pre-wrap">{improvedAbstract}</p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
