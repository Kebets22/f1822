import React from 'react';

const Button = ({children}: {children: string}) => {
    return (
            <button>{children}</button>
    )
};

export default Button;