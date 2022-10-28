import React from "react";
import CountModal from "../components/modal/CountModal";
import { HeadCountType } from "../types";

const useHeadCount = () => {
  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<HeadCountType<number>>({
    adult: 2,
    child: 0,
  });

  const isCountModalClicked = (): JSX.Element | null => {
    return showCountModal ? (
      <CountModal
        initialChild={count.child}
        initialAdult={count.adult}
        setShowCountModal={setShowCountModal}
        handleChangeNumberOfPeople={(srcAdult: number, srcChild: number) => {
          setCount({
            adult: srcAdult,
            child: srcChild,
          });
        }}
      />
    ) : null;
  };

  return {
    count,
    setCount,
    showCountModal,
    setShowCountModal,
    isCountModalClicked,
  };
};

export default useHeadCount;
