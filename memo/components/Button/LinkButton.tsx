import styles from "./button.module.scss"
import clsx from "clsx"

import Link, { LinkProps } from "next/link";
import Button from "./Button";

interface Props extends LinkProps {
    children: React.ReactNode;
    size?: "small" | "big";
    contentType?: "text" | "image";
    disabled?: boolean;
}

export default function LinkButton({ children, href, size = "small", contentType="text", disabled = false, ...restProps }: Props) {
    if (disabled) {
        return <Button disabled>{children}</Button>
    } 

  return (
    <Link 
        href={href} 
        className={clsx(styles.button, styles[size], styles[contentType])} 
        {...restProps}>
        {children}
    </Link>
  )
}
