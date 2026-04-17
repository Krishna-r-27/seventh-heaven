import projectIcon from "../../assets/img/project.png";
import houseIcon from "../../assets/img/house.png";
import clientIcon from "../../assets/img/client.png";

import successImgPng from "../../assets/img/success.png";
import successImgWebp from "../../assets/img/success.webp";

const successData = {
    title: "Our Awesome ",
    highlight: "Success Story",
    subtitle:
        "Numbers that reflect our unwavering commitment to excellence and client satisfaction.",

    stats: [
        {
            value: "20.5K",
            label: "Featured Projects",
            icon: projectIcon,
        },
        {
            value: "100.5k",
            label: "Luxury Houses",
            icon: houseIcon,
        },
        {
            value: "150.5k",
            label: "Satisfied Clients",
            icon: clientIcon,
        },
    ],

    image: {
        png: successImgPng,
        webp: successImgWebp,
    },
};

export default successData;