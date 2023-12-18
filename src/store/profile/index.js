import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      waiting: false,
      data: null,
      error: null,
    };
  }

  async loadProfile() {
    this.setState({ ...this.getState(), waiting: true });
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
          data: json.result,
          waiting: false,
          error: null,
        });
      } else {
        this.setState({
          ...this.getState(),
          data: null,
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
