/*********localStorage ****************/
localStorage.getItem('elLang') ? "": localStorage.setItem('elLang','ua');

localStorage.getItem('elLang') =="en" ? $("#current-lang").addClass("en"):"";
$.elephantLanguage = localStorage.getItem('elLang');