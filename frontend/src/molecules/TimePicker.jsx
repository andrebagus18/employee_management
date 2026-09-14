import { useState } from "react";
import { Clock } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function TimePicker({ name, label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("hour");

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0"),
  );

  const handleHour = (hour) => {
    const minute = value?.split(":")[1] || "00";

    onChange({
      target: {
        name,
        value: `${hour}:${minute}`,
      },
    });

    setStep("minute");
  };

  const handleMinute = (minute) => {
    const hour = value?.split(":")[0] || "00";

    onChange({
      target: {
        name,
        value: `${hour}:${minute}`,
      },
    });

    setOpen(false);
    setStep("hour");
  };

  const handleOpen = () => {
    setStep("hour");
    setOpen(true);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <Button
        type="button"
        variant="outline"
        className="w-full justify-start font-normal"
        onClick={handleOpen}
      >
        <Clock className="mr-2 h-4 w-4" />
        {value || "Select time"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {step === "hour" ? "Select Hour" : "Select Minute"}
            </DialogTitle>
          </DialogHeader>

          {step === "hour" ? (
            <div className="grid grid-cols-4 gap-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  type="button"
                  variant="outline"
                  onClick={() => handleHour(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  type="button"
                  variant="outline"
                  onClick={() => handleMinute(minute)}
                >
                  {minute}
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TimePicker;

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// function TimePicker({ name, label, value, onChange }) {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor={name}>{label}</Label>
//       <Input
//         id={name}
//         name={name}
//         type="time"
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

// export default TimePicker;
