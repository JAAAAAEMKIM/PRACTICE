import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./Card.module.scss";
import clsx from "clsx";

type CardProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

type PolymorphicWithRef = <T extends React.ElementType = "div">(
  props: CardProps<T> & { ref?: ComponentPropsWithRef<T>["ref"] },
) => React.ReactNode;

const Card: PolymorphicWithRef = forwardRef(
  <T extends React.ElementType = "div">(
    { as, children, className, ...props }: CardProps<T>,
    ref: ComponentPropsWithRef<T>["ref"],
  ): React.ReactNode => {
    const Component = as || "div";

    const [a, setA] = useState([]);

    const fetch = useCallback(() => {
      setA([]);
    }, []);

    useEffect(() => {
      fetch();
    }, [fetch]);

    const ret = (
      <Component ref={ref} className={clsx(styles.card, className)} {...props}>
        {children}
      </Component>
    );

    return ret;
  },
);

export default Card;
