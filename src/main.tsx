import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {App} from './App';

hydrateRoot(document.getElementById('root')!,<App/>);
// Keep the mature native gallery, bilingual copy and contact behavior after hydration.
requestAnimationFrame(()=>requestAnimationFrame(()=>import('./legacy')));
