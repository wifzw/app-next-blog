import Link from "next/link";

import classes from "./main-navigation.module.css";

import Logo from "./Logo";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Postagens</Link>
          </li>
          <li>
            <Link href="/contact">Contatos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
