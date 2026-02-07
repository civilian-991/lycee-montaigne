import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  emptyMessage?: string;
  children: ReactNode;
  count?: number;
}

export function DataTable({ columns, emptyMessage = "Aucun élément.", children, count }: DataTableProps) {
  if (count === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center text-sm text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-background-alt text-left text-xs font-medium uppercase text-text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 ${col.className || ""}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}
