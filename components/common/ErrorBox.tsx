import { AlertCircle } from "lucide-react";

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4 flex gap-3">
      <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
      <p className="text-red-800 text-sm">{message}</p>
    </div>
  );
}
