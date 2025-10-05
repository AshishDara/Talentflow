import type { PropsWithChildren, ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close"
            className="p-1 h-auto"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="text-gray-800">{children}</div>
      </div>
    </div>
  );
}