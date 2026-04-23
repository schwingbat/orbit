import { Context, html } from "@manyducks.co/dolla";
import { getRouter } from "@manyducks.co/dolla/router";
import styles from "./NavLink.module.css";

interface NavLinkProps {
  href: string;
  children: any;
}

export function NavLink(this: Context, props: NavLinkProps) {
  const { isActive } = getRouter(this);
  return html`
    <a
      href=${props.href}
      class=${{
        [styles.navLink]: true,
        [styles.active]: isActive(props.href),
      }}
    >
      ${props.children}
    </a>
  `;
}
