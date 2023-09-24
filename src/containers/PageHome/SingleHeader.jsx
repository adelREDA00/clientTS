import React, { useEffect, useState } from 'react';

const SingleHeader = ({ name, Typedata, handleDisplay, trackTitle, type }) => {
  const PF = "https://apiblognode.onrender.com/images/";
  const [image, setImage] = useState(null);
  const [elemtype, setElemtype] = useState("");
  const [headData, setHeadData] = useState([]);
  const [jData, setjData] = useState({});

  useEffect(() => {
    if (!Typedata) return; // Wait until Typedata is available

    const { id, image_path } = Typedata;
    if (id === 0) {
      setImage(PF + image_path);
    } else {
      setImage(image_path);
    }
  }, [Typedata]);

  useEffect(() => {
    if (!Typedata) return; // Wait until Typedata is available

    if (type === "0") {
      setElemtype("COMPETITION");
      setHeadData(["News", "Matchs", "Resultats", "Classement", "Transferts"]);
      setjData(null);
    } else if (type === "1") {
      setElemtype("CLUB");
      setHeadData(["News", "Matchs", "Resultats", "Transferts"]);
      setjData(null);
    } else if (type === "2") {
      setElemtype("Joueur");
      setjData(Typedata.country_id);
    }
  }, [type, Typedata]);


  if (!Typedata) {
    return <div>Loading...</div>; // Or any loading indicator or placeholder
  }

  const HeadTitle = headData.map((title, index) => {
    return (
      <li
        onClick={() => {
          handleDisplay(title);
        }}
        key={index}
      >
        <a className={title === trackTitle ? 'active' : ''} href="#!">
          {title}
        </a>
      </li>
    );
  });

  return (
    <div className="dashmain">
      <div className="dashboard">
        <header>
          <div className="f fe">
            <div className="img" style={{ backgroundImage: `url('${image}')` }}></div>
            <div className="heading">
              <h5 className="date">{elemtype}</h5>
              <h2 className="title">{name}</h2>
              {jData && jData.image_path && (
                <div className='player_data'>
                  <img src={PF + jData.image_path} alt="" />
                  <h3>{jData.name}</h3>
                </div>
              )}
            </div>
          </div>
        </header>
        <section>
          <div className="category">
            <ul>
              {HeadTitle}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleHeader;
