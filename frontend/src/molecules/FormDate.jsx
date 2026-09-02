import { CalendarIcon } from "lucide-react";
import { format, isValid } from "date-fns";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

function FormDate({
  label,
  name,
  value,
  onChange,
  placeholder = "Select Date",
}) {
  const [open, setOpen] = useState(false);

  const selectDate =
    value && !isNaN(new Date(value).getTime()) ? new Date(value) : undefined;
  //   console.log("date value ke-backend:", value);
  //   console.log("select date:", selectDate);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full flex items-center border border-slate-400/50 p-1 rounded-lg justify-start text-left font-normal cursor-text">
          <CalendarIcon className="mr-2 size-4" />
          {selectDate && isValid(selectDate)
            ? format(selectDate, "dd MMMM yyyy")
            : placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectDate}
            onSelect={(date) => {
              onChange({
                target: {
                  name,
                  value: date ? format(date, "yyyy-MM-dd") : "",
                },
              });
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FormDate;
