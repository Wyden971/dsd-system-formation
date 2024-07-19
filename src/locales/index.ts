import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/fr";
import dot from "dot-object";

import frMessages from "./fr.json";
import enMessages from "./en.json";

export const fr = dot.dot(frMessages);
export const en = dot.dot(enMessages);
