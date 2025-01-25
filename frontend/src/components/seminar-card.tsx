import React, { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Major, type Seminar, SeminarType } from "@/types/api-response.types";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ClockIcon,
  DoorClosed,
  FileCheck,
  FileText,
  GraduationCap,
  UserIcon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface BadgeTooltip {
  major: Major;
}

const BadgeTooltip: React.FC<BadgeTooltip> = memo(({ major }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          className={cn(
            major === Major.TI && "bg-blue-500 hover:bg-blue-600",
            major === Major.SI && "bg-yellow-500 hover:bg-yellow-600",
            major === Major.BD && "bg-green-500 hover:bg-green-600",
            "text-white",
          )}
        >
          {major}
        </Badge>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          major === Major.TI && "bg-blue-500",
          major === Major.SI && "bg-yellow-500",
          major === Major.BD && "bg-green-500",
          "rounded-full text-white",
        )}
      >
        {major}
      </TooltipContent>
    </Tooltip>
  );
});

BadgeTooltip.displayName = "SeminarBadgeTooltip";

interface SeminarCardProps {
  idx: number;
  seminar: Seminar;
}

function SeminarCard({ idx, seminar }: SeminarCardProps) {
  return (
    <Card key={idx} className="w-full md:w-[calc(50%-1rem)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="max-w-[80%]">{seminar.title}</CardTitle>
          <BadgeTooltip major={seminar.major} />
        </div>
        <CardDescription>{seminar.studentName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-2">
          {seminar.seminarType === SeminarType.Seminar1 && (
            <FileText className="h-4 w-4" />
          )}
          {seminar.seminarType === SeminarType.Seminar2 && (
            <FileCheck className="h-4 w-4" />
          )}
          {seminar.seminarType === SeminarType.Pendadaran && (
            <GraduationCap className="h-4 w-4" />
          )}
          {seminar.seminarType === SeminarType.SeminarKKP && (
            <FileText className="h-4 w-4" />
          )}
          {seminar.seminarType === SeminarType.SeminarPI && (
            <FileText className="h-4 w-4" />
          )}
          <span>{seminar.seminarType}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {format(seminar.datetime, "PPP", {
              locale: id,
            })}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>
            {format(seminar.datetime, "HH:mm", {
              locale: id,
            })}
          </span>
        </div>
        <div className="mt-1 flex flex-col gap-2">
          {seminar.advisors.map((advisor, index) => (
            <div key={index} className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>
                Pembimbing {index === 0 ? "Utama" : "Kedua"}: {advisor}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex flex-col gap-2">
          {seminar.examiners.map((examiner, index) => (
            <div key={index} className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>
                {index === 0 ? "Ketua" : "Anggota"} Penguji: {examiner}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <DoorClosed className="h-4 w-4" />
          <span>{seminar.room}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(SeminarCard);
