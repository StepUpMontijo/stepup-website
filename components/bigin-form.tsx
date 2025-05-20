"use client";

interface BiginFormProps {
  className?: string;
  transparent?: boolean;
  title?: string;
  subtitle?: string;
}

export default function BiginForm({
  className = "",
  transparent = false,
  title,
  subtitle,
}: BiginFormProps) {
  const containerClasses = transparent
    ? `${className}`
    : `${className} bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 overflow-hidden transition-all hover:shadow-xl`;

  return (
    <div className={containerClasses}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      <iframe
        width="610px"
        height="520px"
        src="https://eu.bigin.online/org20105084324/forms/pedido-de-aula-experimental"
        className="w-full"
      />
    </div>
  );
}
