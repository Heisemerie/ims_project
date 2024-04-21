let classs = window.location.pathname.split("/")
let nav = classs[2]
let el = document.getElementsByClassName(nav)
el[0].classList.add("active")