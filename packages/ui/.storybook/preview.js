import '../src/styles.css';
import './storybook.css';
import { RouterContext } from 'next/dist/shared/lib/router-context';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  themes: {
    clearable: false,
    target: 'root',
    list: [
      {
        name: 'Light',
        class: [],
        color: '#ffffff',
        default: true,
      },
      {
        name: 'Dark',
        // The class dark will be added to the body tag
        class: ['dark'],
        color: '#000000',
      },
    ],
  },
};
