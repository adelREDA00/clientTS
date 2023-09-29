import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}



export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc=" Notre blog ne se limite pas aux seuls articles et calendriers de matchs. Nous explorons également d'autres aspects du football tels que l'histoire du sport, les techniques d'entraînement, les stratégies de jeu, les moments mémorables, les anecdotes amusantes et les dernières tendances."
      >
        🚀 Et bien plus encore
      </Heading>
      <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-8">
    
          <div
          
            className="p-6 bg-white dark:bg-black/20 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-4xl dark:text-neutral-200">
            Créé avec passion par Toumi Reda
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
           <a className="portlink" href="https://toumi.tech/">PORTFOLIO</a>
            </span>
          </div>
    
      </div>
    </div>
  );
};

export default SectionStatistic;
