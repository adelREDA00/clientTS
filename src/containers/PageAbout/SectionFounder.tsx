import Heading from "components/Heading/Heading";
import NcImage from "components/NcImage/NcImage";
import React from "react";
import HomeSlider from "components/HomeSlider";


export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Articles approfondis`,
    job: "Nous proposons une large gamme d'articles couvrant différents aspects du football.",
    avatar:
      "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1366x436:1368x434)/origin-imgresizer.eurosport.com/2020/08/20/2867364-59093288-2560-1440.jpg",
  },
  {
    id: "4",
    name: `Calendriers des matchs`,
    job: "Calendriers des matchs",
    avatar:
      "https://ddrfootballexpert.com/wp-content/uploads/2021/07/EPL-2021_22-Schedule.png",
  },
  {
    id: "3",
    name: `Recommandations personnalisées `,
    job: "En fonction de vos clubs préférés, de vos ligues préférées et de vos joueurs préférés ",
    avatar:
      "https://resources.premierleague.com/premierleague/photo/2020/03/13/da17ebe6-76c5-4baf-ab1e-4d0f494338ef/Statement_Graphic_PL_Pink.png",
  },
  {
    id: "2",
    name: `Articles sur les joueurs`,
    job: "Nous mettons en valeur les joueurs talentueux et emblématiques du football. Vous trouverez des profils détaillés",
    avatar:
      "https://i1.wp.com/assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt248f4dc0d739f3f1/63b3ea9b98632f5183754b8c/Rival_Sterling_-_Balotelli.jpg",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="Dans notre blog, vous trouverez "
      >
        🔥 vous trouverez
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
