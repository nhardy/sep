import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';


const Html = ({ assets, component, store }) => {
  const content = component ? ReactDOMServer.renderToString(component) : '';
  const head = Helmet.rewind(); // magic.gif

  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" value="text/html; charset='utf-8'" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {__DEVELOPMENT__ ? <script src="/webpack-dev-server.js"></script> : null}
        {head.script.toComponent()}
        {assets.bundle.css && assets.bundle.css.map((path, index) => (
          <link key={`css-${index}`} rel="stylesheet" type="text/css" href={path} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data=${JSON.stringify(store.getState())};`,
          }} />
        {assets.bundle.js.map((path, index) => (
          <script key={`js-${index}`} type="text/javascript" src={path} />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.shape({

  }),
  component: PropTypes.node,
  store: PropTypes.object,
};

export default Html;
