import { BookOpen, RotateCw } from "lucide-react";
export function Loading({
  label = "Loading your library...",
}: {
  label?: string;
}) {
  return (
    <div className="library-status" role="status">
      <span className="loading loading-spinner loading-md" />
      <p>{label}</p>
    </div>
  );
}
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="library-status">
      <BookOpen size={32} strokeWidth={1.4} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function ErrorState({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="library-status" role="alert">
      <p>{message}</p>
      {retry && (
        <button className="btn btn-outline" onClick={retry}>
          <RotateCw size={15} /> Try again
        </button>
      )}
    </div>
  );
}
