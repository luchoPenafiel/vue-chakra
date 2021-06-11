const parseJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export default {
  state() {
    return {
      token: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    },
  },
  actions: {
    logout(context) {
      localStorage.clear();

      context.commit('setUser', {
        token: null,
        tokenExpiration: null,
      });
    },
    async signin(context, payload) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const response = await fetch('https://rest-api.luchopenafiel.dev/user/signin', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        const tokenParsed = parseJWT(responseData.token);

        context.commit('setUser', {
          token: responseData.token,
          tokenExpiration: tokenParsed.exp,
        });
      }

      return responseData;
    },
    async signup(context, payload) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const response = await fetch('https://rest-api.luchopenafiel.dev/user/signup', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          name: payload.name,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
        }),
      });

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        const tokenParsed = parseJWT(responseData.token);

        context.commit('setUser', {
          token: responseData.token,
          tokenExpiration: tokenParsed.exp,
        });
      }

      return responseData;
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      console.log('actions:autoLogin 1');

      const tokenParsed = parseJWT(token);
      const today = Date.now();

      if (token && today > tokenParsed.exp) {
        console.log('actions:autoLogin 2');
        context.commit('setUser', {
          token,
          tokenExpiration: tokenParsed.exp,
        });
      } else {
        console.log('actions:autoLogin 3');
        localStorage.clear();
      }
    },
  },
  getters: {
    isAuth(state) {
      console.log('getters:isAuth', state);
      console.log('getters:isAuth: !!state', state.token);

      return state.token;
    },
  },
};
