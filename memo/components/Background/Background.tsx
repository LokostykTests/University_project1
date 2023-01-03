import styles from "./background.module.scss"

interface Props {
    children: React.ReactNode,
}

export default function Background({ children, ...restProps }: Props) {
  return (
    <section className={styles.background} {...restProps}>
        {children}
    </section>
  )
}
