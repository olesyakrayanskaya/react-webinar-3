import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      token: null,
      phone: null,
      email: null,
      username: null,
      waiting: false,
      error: null,
    };
  }

  async login(body) {
    this.setState({ ...this.getState(), waiting: true, error: null });
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
        username: json.result.user.profile.name,
        waiting: false,
      });
      localStorage.setItem('token', json.result.token);
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message,
        waiting: false,
      });
    }
  }

  async logout() {
    this.setState({ ...this.getState(), waiting: true, error: null });
    const token = this.getState().token;
    localStorage.removeItem('token');

    this.setState({ ...this.initState() });
  }

  isLogged() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  async loadProfile() {
    this.setState({ ...this.getState(), waiting: true, error: null });
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
          username: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
          userProfile: json.result,
          waiting: false,
        });
      } else {
        this.setState({
          ...this.getState(),
          user: null,
          token: null,
        });
        localStorage.removeItem('token');
      }
    } else {
      this.setState({ ...this.getState(), waiting: false });
    }
  }
}

export default ProfileState;
