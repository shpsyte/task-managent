import clsx from "clsx";
export default function GlassPane({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <>
      <div
        className={clsx(
          "backdrop-blur-md rounded-2xl border-solid border-2 border-gray-200",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
