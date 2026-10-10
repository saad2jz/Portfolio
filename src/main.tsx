import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {App} from './App';

// DOM enhancements must wait for React's committed tree, rather than guessing
// hydration completion with animation frames on slower devices.
function Portfolio(){
 React.useEffect(()=>{void import('./legacy');},[]);
 return <App/>;
}
hydrateRoot(document.getElementById('root')!,<Portfolio/>);
