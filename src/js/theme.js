import getCookie from "./functions/getCookie";


const themes = {
  clear: {
    key: '1',
    name: 'default'
  },
  dark: {
    key: '2',
    name: 'dark'
  }
}
let activeTheme;


const init = () => {
  document.addEventListener('keyup', keyupHandler);
  window.addEventListener('unload', saveTheme);
  window.addEventListener('change', changeHandler);
  initTheme();
}

const destroy = () => {
  document.removeEventListener('keyup', keyupHandler);
  window.removeEventListener('unload', saveTheme);
  window.removeEventListener('change', changeHandler);
}

function changeHandler(event){
  if(event.target.closest('.-theme-changer-')){
    if(event.target.checked){
      setTheme(themes.dark);
    }else{
      setTheme(themes.clear);
    }
  }
}

function keyupHandler(event) {
  for (const i in themes) {
    if (!themes.hasOwnProperty(i)) continue;
    if (event.key == themes[i].key && event.altKey) {
      setTheme(themes[i])
      return;
    }
  }
}

function saveTheme() {
  const activeThemeJson = JSON.stringify(activeTheme);
  document.cookie = 'activeThemeJson=' + activeThemeJson + '; path=/; expires=Tue, 19 Jan 2138 03:14:07 GMT'
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme.name);
  activeTheme = theme;

  const changers = document.querySelectorAll('.-theme-changer-')
  Array.from(changers).forEach(element => {
    if (theme.name == 'dark') {
      element.checked = true
    }else{
      element.checked = false
    }
  });
}

function initTheme() {
  const activeThemeJson = getCookie('activeThemeJson');
  if (!activeThemeJson) {
    setTheme(themes.clear);
    return;
  }
  try {
    const oldActiveTheme = JSON.parse(activeThemeJson);
    setTheme(oldActiveTheme);
  } catch {
    setTheme(themes.clear);
  }
}




export default { init, destroy }