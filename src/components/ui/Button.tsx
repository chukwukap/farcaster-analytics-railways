interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className = "",
  isLoading = false,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5 rounded-md",
    md: "text-base px-4 py-2 rounded-lg",
    lg: "text-lg px-6 py-3 rounded-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-3 border-current border-t-transparent rounded-full opacity-75" />
          </div>
          <span className="opacity-0">{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
