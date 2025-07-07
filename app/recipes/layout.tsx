export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-1 md:py-2">
      <div className="inline-block max-w-2xl justify-center">{children}</div>
    </section>
  );
}
