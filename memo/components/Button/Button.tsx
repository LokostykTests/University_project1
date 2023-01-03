import styles from "./button.module.scss"
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: "small" | "big";
    contentType?: "text" | "image";
}

export default function Button({ children, size = "small", contentType="text", ...restProps }: Props) {
  return (
    <button className={clsx(styles.button, styles[size], styles[contentType])} {...restProps}>
        {children}
    </button>
  )
}
