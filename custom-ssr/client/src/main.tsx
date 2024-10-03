import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

// App으로 만들어진 html을 server의 index로 서빙
// index.js에서 hydrateRoot를 호출하여 알맞은 hydration 진행
ReactDOM.hydrateRoot(document, <App />);
