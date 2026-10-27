import * as Primitive from "@radix-ui/react-dialog";
import type { ReactElement } from "react";
import { X } from "lucide-react";
import type { DialogProps } from "../../types/ui.types";
import { Button } from "./button";
export function Dialog({
  title,
  description,
  open,
  onOpenChange,
  children,
}: DialogProps): ReactElement {
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className="dialog-overlay" />
        <Primitive.Content className="dialog-content">
          <Primitive.Title>{title}</Primitive.Title>
          <Primitive.Description>{description}</Primitive.Description>
          <Primitive.Close asChild>
            <Button
              variant="ghost"
              className="dialog-close"
              aria-label="Cerrar"
            >
              <X size={19} />
            </Button>
          </Primitive.Close>
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
