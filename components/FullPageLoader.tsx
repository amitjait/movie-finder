import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-gray-700 font-medium">Loading movie details...</p>
      </div>
    </div>
  );
}
