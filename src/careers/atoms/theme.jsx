import { atom, useRecoilState } from 'recoil';
const themeOptions = ['light', 'dark'] 

const handleTailwindDark = (theme) => {
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
};

const getDefaultTheme = () => {
  const localTheme = window.localStorage.getItem('theme');
  if (localTheme && themeOptions.includes(localTheme)) {
    handleTailwindDark(localTheme);
    return localTheme;
  }

  const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
  handleTailwindDark(matches ? 'dark' : 'light');
  return matches ? 'dark' : 'light';
};

const themeAtom = atom({
  key: 'theme',
  default: getDefaultTheme(),
});

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    window.localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    handleTailwindDark(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
  };
};
