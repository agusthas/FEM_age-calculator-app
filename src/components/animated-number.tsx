import CountUp from "react-countup";

interface AnimatedNumberProps {
  start?: number;
  end: number;
}

export function AnimatedNumber({ start = 0, end }: AnimatedNumberProps) {
  return (
    <CountUp start={start} end={end}>
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
}
