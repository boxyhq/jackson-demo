import { OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce';
import { useState } from 'react';

let oauth;

const json = (response) => {
  return response.json();
};

export default function OAuth() {
  const [loggedIn, setLoggedIn] = useState(null);

  if (!oauth) {
    oauth = new OAuth2AuthCodePKCE({
      extraAuthorizationParams: {
        provider: 'saml',
      },
      scopes: [],
      authorizationUrl: 'http://localhost:5000/oauth/authorize',
      tokenUrl: 'http://localhost:5000/oauth/token',
      redirectUrl: 'http://localhost:3000',
      clientId: 'tenant=boxyhq.com&product=demo',
      clientSecret: 'dummy',
      // clientId: 'ce68d73b46d65517741d76ebb9e5df95bf321d09',
      // clientSecret: '9abe24d01a4f6cff167df0b839a5fb669b89fc4921e3d6c1',
      onAccessTokenExpiry(refreshAccessToken) {
        console.log('Expired! Access token needs to be renewed.');
        alert(
          'We will try to get a new access token via grant code or refresh token.'
        );
        return refreshAccessToken();
      },
      onInvalidGrant(refreshAuthCodeOrRefreshToken) {
        console.log('Expired! Auth code or refresh token needs to be renewed.');
        alert('Redirecting to auth server to obtain a new auth grant code.');
        //return refreshAuthCodeOrRefreshToken();
      },
    });

    oauth
      .isReturningFromAuthServer()
      .then((hasAuthCode) => {
        if (!hasAuthCode) {
          console.log('Something wrong...no auth code.');
        }
        return oauth.getAccessToken().then((token) => {
          // post the token to server and then fetch userinfo from server and log in the user
          console.log(token.token.value);
          // TODO: Send a request to the server to make a fetch to Jackson userinfo
          fetch(
            'http://localhost:5000/oauth/userinfo?access_token=' +
              token.token.value
          )
            .then(json)
            .then(function (data) {
              console.log('Request succeeded with JSON response', data);
              if (data.email) {
                setLoggedIn(data.email);
                console.log('Logged in as:', data.email);
                //alert('Logged in as: ' + data.email);
              }
            })
            .catch(function (error) {
              console.log('Request failed', error);
            });
        });
      })
      .catch((potentialError) => {
        if (potentialError) {
          console.log(potentialError);
        }
      });
  }

  const authorize = function () {
    oauth.fetchAuthorizationCode();
  };

  return loggedIn ? (
    <div>Logged in as {loggedIn}</div>
  ) : (
    <button onClick={authorize}>Client-Side Flow</button>
  );
}
