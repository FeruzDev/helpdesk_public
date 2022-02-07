import {RU} from './RU';
import {EN} from './EN';
import {SITE_LANG} from "../tools/constants";




export function getText(word){
    if (localStorage.getItem(SITE_LANG) === "en"){
        return EN[word];
    } else return RU[word];
}

export function getLang(){
    return localStorage.getItem(SITE_LANG);
}