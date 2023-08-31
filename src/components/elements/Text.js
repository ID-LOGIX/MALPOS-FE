import React from "react";

export default function Text({ as, style, children, className, onClick }) {
    const Component = as || "p";
    return <Component className={ className } style={ style } onClick={ onClick }>{ children }</Component>
}
