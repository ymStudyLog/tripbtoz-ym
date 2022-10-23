import React from "react";
import CalenderModal from "../components/modal/CalendarModal";
import { addDate } from "../utils/dateUtils";

type Props = {
  today: Date;
};

const useStayPeriod = (props: Props) => {
  const { today } = props;
  const [initialMonthDate, setInitialMonthDate] = React.useState(today);
  const [startDate, setStartDate] = React.useState<Date | undefined>( //클릭하면 바뀌는 값 겸 기본값
    addDate(today, 7)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    addDate(today, 8)
  );
  const [showCalendarModal, setShowCalendarModal] =
    React.useState<boolean>(false);

  const isCalenderModalClicked = () => {
    return showCalendarModal ? (
      <CalenderModal
        initialCheckIn={startDate}
        initialCheckOut={endDate}
        today={today}
        initialMonthDate={initialMonthDate}
        handleChangeMonthDate={(date: Date) => {
          setInitialMonthDate(date);
        }}
        handleChangeCheckInOut={(srcCheckIn?: Date, srcCheckOut?: Date) => {
          let changed = false;
          if (srcCheckIn !== startDate || srcCheckOut !== endDate) {
            changed = true;
          }
          setStartDate(srcCheckIn);
          setEndDate(srcCheckOut);
          if (changed && srcCheckIn && srcCheckOut) {
            setShowCalendarModal(false);
          }
        }}
      />
    ) : null;
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showCalendarModal,
    setShowCalendarModal,
    isCalenderModalClicked,
  };
};

export default useStayPeriod;
