import { Suspense } from "react";
import { BookForm } from "./BookForm";

function FormFallback() {
  return (
    <div className="h-[32rem] animate-pulse rounded-3xl border border-[var(--hair)] bg-panel/80" />
  );
}

export function BookFormFrame(
  props: { variant?: "card" | "page"; defaultParty?: string },
) {
  return (
    <Suspense fallback={<FormFallback />}>
      <BookForm {...props} />
    </Suspense>
  );
}
