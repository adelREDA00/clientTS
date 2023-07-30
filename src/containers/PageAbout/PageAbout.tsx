import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Blog Magazine React Template</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 	À propos de nous."
          btnText=""
          subHeading="Bienvenue sur notre blog de football passionné ! Nous sommes une équipe de fans de football passionnés qui souhaitent partager notre amour et notre expertise du sport le plus populaire au monde. Que vous soyez un fervent supporter, un joueur passionné ou simplement curieux de découvrir le monde du football, vous êtes au bon endroit.

          Notre objectif est de fournir des informations, des analyses, des actualités et des articles approfondis sur tout ce qui concerne le football. Que ce soit les derniers résultats des matchs, les actualités sur les transferts, les analyses tactiques ou les histoires fascinantes des joueurs, notre blog est votre destination incontournable."
        />

        <SectionFounder />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionStatistic />
        </div>


      </div>
    </div>
  );
};

export default PageAbout;
