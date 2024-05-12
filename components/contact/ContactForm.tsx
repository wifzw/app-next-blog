import { MouseEvent, useContext, useState } from "react";
import classes from "./contact-form.module.css";
import NotificationContext from "@/store/notification-context";

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredMessage, setEnteredMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const notificationCtx = useContext(NotificationContext);

  async function sendContactData(contactData: {
    email: string;
    name: string;
    message: string;
  }) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  async function sendMessageHandler(event: MouseEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (
      !enteredEmail?.includes("@") ||
      enteredName?.trim() === "" ||
      enteredMessage?.trim() === ""
    ) {
      setError("Invalid input");

      return;
    }

    setError(null);

    setIsLoading(true);

    notificationCtx.showNotification({
      title: "Send contact...",
      message: "Registering from database...",
      status: "pending",
    });

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      setIsLoading(false);

      notificationCtx.showNotification({
        title: "Successfully!",
        message: "Contact successfully registered",
        status: "success",
      });

      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error: any) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error?.message ?? "Failed to create contact",
        status: "error",
      });

      setIsLoading(false);

      return;
    }
  }

  return (
    <section className={classes.contact}>
      <h1>Como posso ajudá-lo?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Seu Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Seu Nome</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Sua mensagem</label>
          <textarea
            id="message"
            rows={5}
            value={enteredMessage}
            required
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.control}>
          <p>{error}</p>
        </div>

        <div className={classes.actions}>
          {isLoading ? <p>Loading...</p> : <button>Enviar Mensagem</button>}
        </div>
      </form>
    </section>
  );
}
