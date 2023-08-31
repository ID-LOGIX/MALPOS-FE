// import React from "react";

// export default function Box({ as, children, className, style }) {
//     const Component = as || "div";
//     return <Component style={ style } className={ className }>{ children }</Component>
// }
import React from "react";

export default function Box({ as, children, className, style, onClick }) {
  const Component = as || "div";

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Component
      style={style}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}
