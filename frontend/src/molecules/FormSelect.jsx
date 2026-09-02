import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placehorder = "Select option",
  error,
}) {
  const selectOption = options.find(
    (option) => String(option.value) === String(value),
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={String(value || "")}
        onValueChange={(value) =>
          onChange({
            target: {
              name,
              value,
            },
          })
        }
      >
        <SelectTrigger id={name} className="w-full border border-slate-400/50">
          {selectOption ? (
            <span>{selectOption.label}</span>
          ) : (
            <span className="text-muted-foreground">{placehorder}</span>
          )}
        </SelectTrigger>
        <SelectContent className="max-h-50">
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default FormSelect;
