import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Hello from './containers/_';
import { Provider } from 'react-redux';
import { store } from './_'

ReactDOM.render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
