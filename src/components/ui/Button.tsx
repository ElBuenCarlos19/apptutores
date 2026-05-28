import * as React from "react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = "default", size = "default", ...props }, ref) => {

        let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:pointer-events-none disabled:opacity-50";

        let variants = {
            default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm border border-indigo-500",
            outline: "border border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-slate-100 text-slate-900 shadow-sm",
            ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
            link: "text-indigo-600 underline-offset-4 hover:underline",
        }

        let sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-12 rounded-lg px-8 text-base",
            icon: "h-10 w-10",
        }

        const currentVariant = variants[variant];
        const currentSize = sizes[size];

        return (
            <button
                className={`${baseStyles} ${currentVariant} ${currentSize} ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
