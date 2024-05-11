import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/kauan.jpeg"
          alt="An image showing Kauan"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Kauan</h1>
      <p>
        I blog about web development - especially frontend frameworks like Vue
        or React
      </p>
    </section>
  );
}
