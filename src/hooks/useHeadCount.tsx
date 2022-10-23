import React from "react";
import CountModal from "../components/modal/CountModal";
import { HeadCountType } from "../types";

const useHeadCount = () => {
  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<HeadCountType>({
    adult: 2,
    child: 0,
  });
  const countValueString = `성인 ${count.adult} / 아이 ${count.child}`;

  const isCountModalClicked = () => {
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
    countValueString,
    isCountModalClicked,
  };
};

export default useHeadCount;
