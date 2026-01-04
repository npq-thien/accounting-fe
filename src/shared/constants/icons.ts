import {
    type IconDefinition,
    faHouse,
    faClipboardList,
    faUsers,
    faChevronDown,
    faChevronRight,
    faChevronLeft,
    faCircleDot,
    faStar,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon, faFileLines } from "@fortawesome/free-regular-svg-icons";

export const ICON_MAP = {
    sun: faSun,
    moon: faMoon,
    defaultMenuIcon: faCircleDot,
    home: faHouse,
    order: faClipboardList,
    people: faUsers,
    chevronDown: faChevronDown,
    chevronRight: faChevronRight,
    chevronLeft: faChevronLeft,
    bars: faBars,
    form: faFileLines,
    star: faStar,
} as const satisfies Record<string, IconDefinition>;

export type IconKey = keyof typeof ICON_MAP;
