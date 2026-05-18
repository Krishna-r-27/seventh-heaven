import visionIcon from "../../assets/img/vision.png";
import missionIcon from "../../assets/img/mission.png";
import visionMissionPng from "../../assets/img/vision-mission.png";
import visionMissionWebp from "../../assets/img/vision-mission.webp";

const visionMissionData = {
    vision: {
        title: "Vision",
        icon: visionIcon,
        description:
            "Our vision is to become one of Dubai's most trusted and leading holiday homes companies by delivering exceptional accommodation experiences, maximizing value for property owners, and creating memorable stays for every guest."
    },

    mission: {
        title: "Mission",
        icon: missionIcon,
        points: [
            "We aim to provide high-quality, fully furnished, and well-maintained holiday homes that ensure comfort and satisfaction for every guest. ",
            "We are committed to delivering outstanding customer service with professionalism, reliability, and attention to detail.",
            "Our goal is to help property owners maximize rental income through efficient property management and strategic listing optimization.",
        ]
    },
    image: {
        png: visionMissionPng,
        webp: visionMissionWebp
    }
};

export default visionMissionData;