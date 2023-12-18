import StoreModule from '../module';

class LoginState extends StoreModule {
  initState() {
    return {
      token: null,
      waiting: false,
      error: null,
      session: false,
      username: null,
      displayError: true,
    };
  }

  setDisplayError(displayError) {
    this.setState({
      ...this.getState(),
      displayError: displayError,
    });
  }

  async login(body) {
    this.setState({ ...this.getState(), waiting: true });
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (response.ok) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        session: true,
        waiting: false,
      });
      localStorage.setItem('token', json.result.token);
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.data.issues
          .map((i) => i.message)
          .reduce((a, b) => a + '/n' + b),
        waiting: false,
        session: false,
      });
    }
  }

  async logout() {
    this.setState({ ...this.getState(), waiting: true });
    const token = this.getState().token;
    localStorage.removeItem('token');
    if (token) {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
    }
    this.setState({ ...this.initState() });
  }

  async checkSession() {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(
        '/api/v1/users/self?fields=email,profile(name,phone)',
        {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        this.setState({
          ...this.getState(),
          token: token,
          session: true,
          username: json.result.profile.name,
        });
      } else {
        this.setState({
          ...this.getState(),
          token: null,
          session: false,
          username: null,
        });
        localStorage.removeItem('token');
      }
    }
  }
}

export default LoginState;
