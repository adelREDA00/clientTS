// @ts-nocheck
import CardLarge1 from "components/CardLarge1/CardLarge1";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";
import  { FC, useState } from "react";



export interface SectionLargeSliderProps {
  className?: string;
  heading?: string;
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  heading = "Top News",
  className = "",
  data
}) => {
  const [indexActive, setIndexActive] = useState(0);




  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= data.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return data.length - 1;
      }
      return state - 1;
    });
  };


  

  


  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {!!heading && <Heading>{heading}</Heading>}
      {data.map((item, index) => (
        <CardLarge1
          key={index}
          isShowing={indexActive === index}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          post={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default SectionLargeSlider;
