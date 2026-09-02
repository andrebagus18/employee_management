import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function TimePicker({ name, label, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type="time"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TimePicker;
