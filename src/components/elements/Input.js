// import React from "react";
// import { useFormContext } from "react-hook-form";

// export default function Input({ type, placeholder, className, name, ...rest }) {
//     const method = useFormContext();

//     return (
//         <>
//             {name ? (
//                 <input
//                     type={type || "text"}
//                     placeholder={placeholder}
//                     className={className}
//                     {...method?.register(name)}
//                     {...rest}
//                 />
//             ) : (
//                 <input type={type || "text"} placeholder={placeholder} className={className} {...rest} />
//             )}
//         </>
//     )
// }

import React from "react";

export default function Input({ type, placeholder, className, ...rest }) {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
}
