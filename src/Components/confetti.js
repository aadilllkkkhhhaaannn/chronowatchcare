import { useEffect } from "react";
import { useState } from "react";
import ReactConfetti from "react-confetti";

const confetti = () => {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    Height: window.innerHeight,
  });

  const [Btn, setBtn] = useState(false);

  const detectSize = () => {
    setDimension({
      width: window.innerWidth,
      Height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize , detectSize");
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  return (
    <>
      <button
        onClick={() => setBtn(!Btn)}
        className="btn btn-sm w-100 btn-dark rounded-0"
      >
        Login{" "}
      </button>
      {Btn && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.Height}
          tweenDuration={9000}
        />
      )}
    </>
  );
};

export default confetti;
