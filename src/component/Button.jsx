import React from 'react';

function Button({
    children,
    onClick,
    type = 'button',
    className = '',
    variant = 'primary',
    disabled = false
}) {
    // Class styles for different button types
    const baseStyle =
        'px-4 py-2 rounded-md font-semibold focus:outline-none transition ease-in-out duration-300';

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        third: 'bg-'
    
    };

    const disabledStyle = 'bg-gray-300 text-gray-500 cursor-not-allowed';

    const appliedStyle = disabled
        ? disabledStyle
        : `${variantStyles[variant]} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${appliedStyle}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
