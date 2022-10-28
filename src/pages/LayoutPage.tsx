import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DefaultLayout from "../layout/DefaultLayout";
import SearchBar from "../components/common/SearchBar";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageType } from "../types";

const LayoutPage = () => {
  const { stayPeriodOrNull, headCountOrNull, checkLocalStorage } =
    useLocalStorage();
  const [currentChoice, setCurrentChoice] = React.useState<LocalStorageType>({
    stayPeriod: {
      checkIn: "",
      checkOut: "",
    },
    headCount: {
      adult: 2,
      child: 0,
    },
  });

  React.useEffect(() => {
    const storageStayPeriod: string | null = localStorage.getItem("stayPeriod");
    const storageHeadCount: string | null = localStorage.getItem("headCount");
    checkLocalStorage(storageStayPeriod, storageHeadCount);
  }, [checkLocalStorage]);

  React.useEffect(() => {
    setCurrentChoice((prevState: LocalStorageType) => {
      return {
        ...prevState,
        stayPeriod: {
          ...prevState.stayPeriod,
          checkIn:
            stayPeriodOrNull.checkIn === null ? "" : stayPeriodOrNull.checkIn,
          checkOut:
            stayPeriodOrNull.checkOut === null ? "" : stayPeriodOrNull.checkOut,
        },
      };
    });
  }, [stayPeriodOrNull]);

  React.useEffect(() => {
    setCurrentChoice((prevState: LocalStorageType) => {
      return {
        ...prevState,
        headCount: {
          ...prevState.headCount,
          adult: headCountOrNull.adult === null ? 2 : headCountOrNull.adult,
          child: headCountOrNull.child === null ? 0 : headCountOrNull.child,
        },
      };
    });
  }, [headCountOrNull]);

  return (
    <DefaultLayout>
      <SearchBarPositioner>
        <SearchBar
          setCurrentChoice={setCurrentChoice}
          currentChoice={currentChoice}
        />
      </SearchBarPositioner>
      <Outlet context={{ currentChoice }} />
    </DefaultLayout>
  );
};

export default LayoutPage;

const SearchBarPositioner = styled.div`
  width: 0;
  height: 0;
  position: relative;
`;