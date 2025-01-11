// frontend/src/pages/_app.js

import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { IntlProvider, FormattedMessage } from 'react-intl';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const messages = {
  en,
  zh,
};

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  const [locale, setLocale] = useState('zh');
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLocale = localStorage.getItem('locale') || 'zh';
    setTheme(savedTheme);
    setLocale(savedLocale);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <button onClick={toggleTheme} style={{ position: 'fixed', top: 10, right: 10 }}>
          <FormattedMessage
            id="toggle_theme"
            defaultMessage="Toggle to {mode} mode"
            values={{ mode: theme === 'light' ? 'Dark' : 'Light' }}
          />
        </button>
        <button onClick={toggleLocale} style={{ position: 'fixed', top: 10, right: 100 }}>
          <FormattedMessage
            id="toggle_language"
            defaultMessage="Switch to {language}"
            values={{ language: locale === 'en' ? 'Chinese' : 'English' }}
          />
        </button>
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
};

export default MyApp;
