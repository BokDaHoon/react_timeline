import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
const root = document.getElementById('root');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <MuiThemeProvider>
                <Provider store={store}>
                    <Component />
                </Provider>
            </MuiThemeProvider>
        </AppContainer>, root);
};

render(require('./containers/Root.js').default);

if (module.hot) {
    module.hot.accept('./containers/Root.js', () => {
        const Root = require('./containers/Root.js').default;
        render(Root);
    });
}
