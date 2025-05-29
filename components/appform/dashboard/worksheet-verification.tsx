
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/appform/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/appform/ui/select";
import { Label } from "@/components/appform/ui/label";
import { CalendarDays, BookOpen } from "lucide-react";

export function WorksheetVerification() {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2024-2025");
  const [selectedYearOfStudy, setSelectedYearOfStudy] = useState("");

  const academicYears = [
    "2022-2023",
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
  ];

  const yearsOfStudy = [
    "First Year",
    "Second Year",
    "Third Year",
    "Final Year",
  ];

  return (
    <Card className="mb-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" />
          Academic Information
        </CardTitle>
        <CardDescription>Select your academic year and year of study.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="academic-year-select" className="font-medium">Choose Academic Year:</Label>
          <Select value={selectedAcademicYear} onValueChange={setSelectedAcademicYear}>
            <SelectTrigger id="academic-year-select" className="w-full md:w-[280px]">
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>
            <SelectContent>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year-of-study-select" className="font-medium flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
            Year of Study:
          </Label>
          <Select value={selectedYearOfStudy} onValueChange={setSelectedYearOfStudy}>
            <SelectTrigger id="year-of-study-select" className="w-full md:w-[280px]">
              <SelectValue placeholder="Select year of study" />
            </SelectTrigger>
            <SelectContent>
              {yearsOfStudy.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
