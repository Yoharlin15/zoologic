import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHome, 
  faPaw, 
  faHeartPulse,
  faBowlFood,
  faTree,
  faHippo,
  faPersonChalkboard,
  faUsers,
  faTicket,
  faUserGear,
  faChartColumn,
  faUserTie,
  faFlag,
  faBriefcase,
  faBuilding,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export const setupFontAwesomeIcons = () => {
  library.add(
    faHome, 
    faPaw, 
    faHeartPulse,
    faBowlFood,
    faTree,
    faHippo,
    faPersonChalkboard,
    faUsers,
    faTicket,
    faUserGear,
    faChartColumn,
    faUserTie,
    faFlag,
    faBriefcase,
    faBuilding,
    faLocationDot
  );
};
