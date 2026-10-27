import { useState, type ReactElement } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "./button";
import type { DatePickerProps } from "../../types/ui.types";
import "react-day-picker/style.css";
export function DatePicker({
  label,
  value,
  onChange,
}: DatePickerProps): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            variant="secondary"
            aria-label={`${label}: ${format(value, "d MMMM yyyy", { locale: es })}`}
          >
            <CalendarDays size={17} />
            {format(value, "d MMM yyyy", { locale: es })}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="calendar-content"
            sideOffset={8}
            aria-label="Seleccionar fecha"
          >
            <DayPicker
              mode="single"
              required
              selected={value}
              defaultMonth={value}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              locale={es}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
