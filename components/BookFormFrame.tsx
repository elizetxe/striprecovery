import { BookForm, type BookFormDefaults } from "./BookForm";

export function BookFormFrame(props: {
  variant?: "card" | "page";
  defaults?: BookFormDefaults;
}) {
  return <BookForm {...props} />;
}
