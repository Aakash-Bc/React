import React from 'react';

/**
 * A highly customizable and aesthetic Button component using Tailwind CSS.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button text or elements
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.fullWidth - If true, button takes full container width
 * @param {string} props.className - Additional custom classes
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - 'button' | 'submit' | 'reset'
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...props
}) => {
    // Base styles
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden active:scale-95";

    // Size styles
    const sizeStyles = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-base rounded-2xl",
    };

    // Variant styles
    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:ring-blue-500",
        secondary: "bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-500/30 focus:ring-slate-500",
        outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-300",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
        danger: "bg-rose-500 text-white hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30 focus:ring-rose-500",
        gradient: "bg-linear-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/40 focus:ring-indigo-500 border-none",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl transition-all duration-300 hover:border-white/30",
    };

    const currentVariant = variantStyles[variant] || variantStyles.primary;
    const currentSize = sizeStyles[size] || sizeStyles.md;
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            className={`${baseStyles} ${currentSize} ${currentVariant} ${widthStyle} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Subtle shine effect for premium look */}
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
        </button>
    );
};

export default Button;
