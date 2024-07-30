import {Icons} from "../../assets/icons/icons.jsx";
import EN from "../../assets/icons/eng.svg"
import RU from "../../assets/icons/ru.svg"
import UZ from "../../assets/icons/uz.svg"
export const languages = [
  {
    label: "English",
    key: "0",
    code: "en",
    icon: <img src={EN} alt={"english"}/>,
  },
  {
    label: "O'zbek",
    key: "1",
    code: "uz",
    icon: <img src={UZ} alt={"uz"}/>,
  },
  {
    label: "Russian",
    key: "2",
    code: "ru",
    icon: <img src={RU} alt={"russ"}/>,
  },
];
