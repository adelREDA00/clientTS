// @ts-nocheck
import ButtonPrimary from "components/Button/ButtonPrimary";
import React, { FC, ReactNode } from "react";

export interface SectionHeroProps {
  className?: string;
  rightImg: string;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
          Bienvenue sur notre blog de <strong>football passionné</strong>  ! Nous sommes une équipe de fans de football passionnés qui souhaitent partager notre amour et notre expertise du sport le plus populaire au monde. Que vous soyez un fervent supporter, un joueur passionné ou simplement curieux de découvrir le monde du football, vous êtes au bon endroit.

          </span>
          {!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
        </div>
        <div className="flex-grow">
          <img className="w-full about" src={"/assets/2so.svg"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
