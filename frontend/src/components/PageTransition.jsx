export default function PageTransition({ children }) {
  return (
    <div className="animate-fade-in-up w-full h-full">
      {children}
    </div>
  );
}