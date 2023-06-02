import CountUp from "react-countup";

interface AnimatedNumberProps {
  start?: number;
  end: number;
}

export function AnimatedNumber({ start = 0, end }: AnimatedNumberProps) {
  if (end === -1) {
    return <span>--</span>;
  }

  return (
    <CountUp start={start} end={end} preserveValue>
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
}
