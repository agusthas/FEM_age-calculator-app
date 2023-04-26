import { useAgeStore } from "../../store";
import CountUp from "react-countup";

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => (
  <CountUp start={0} end={value}>
    {({ countUpRef }) => <span ref={countUpRef} />}
  </CountUp>
);

const Results = () => {
  const age = useAgeStore((state) => state.age);

  return (
    <div className="result">
      <p>
        <AnimatedNumber value={age.years} /> years
      </p>
      <p>
        <AnimatedNumber value={age.months} /> months
      </p>
      <p>
        <AnimatedNumber value={age.days} /> days
      </p>
    </div>
  );
};

export default Results;
