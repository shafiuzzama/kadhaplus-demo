import { Info } from "lucide-react";

/** Clearly marked placeholder for information that must be verified by the
 * manufacturer before publishing. Never used to fabricate claims. */
export default function Placeholder({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-leaf-300 bg-leaf-50/60 p-4 text-sm">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" />
      <div>
        <p className="font-semibold text-herbal-800">{label}</p>
        <p className="mt-1 text-ink-muted">
          {children ?? "To be confirmed with manufacturer-approved information."}
        </p>
      </div>
    </div>
  );
}
