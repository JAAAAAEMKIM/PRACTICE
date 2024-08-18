import { useEffect, useRef, useState } from "react";

import Markdown from "react-markdown";
import styles from "./Prompter.module.css";

const SERVER_URL = "/sse";

const Prompter = () => {
  const [content, setContent] = useState("");
  const eventSourceRef = useRef<EventSource>();
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      eventSourceRef.current = new EventSource(SERVER_URL);
      eventSourceRef.current.onmessage = (ev) => {
        console.log(ev.data);
        setContent((prev) => `${prev}${ev.data || "\n"}`);
        articleRef.current?.scrollIntoView(false);
      };

      return () => {
        eventSourceRef.current?.close();
      };
    } catch {
      setContent("Error");
    }
  }, []);

  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.scrollIntoView({ block: "end" });
    }
  }, [content]);

  return (
    <article className={styles.article}>
      <div ref={articleRef}>
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
};

export default Prompter;
