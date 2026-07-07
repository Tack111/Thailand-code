export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-dark mb-4">{title}</h1>
        <p className="text-slate-500">This page is under construction. Check back soon!</p>
      </div>
    </div>
  );
}
