import React from "react";

import "components/styles/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   const btnClass = classNames({
      button: true,
      'button--confirm': props.confirm,
      'button--danger': props.danger
   })

   return (
      <button
         onClick={props.onClick}
         disabled={props.disabled}
         // className={buttonClass}
         className={btnClass}>
         {props.children}
      </button>
   )
}
