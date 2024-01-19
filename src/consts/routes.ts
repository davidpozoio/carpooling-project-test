const ROUTES = {
  HOME: {
    ME: "/home",
  },
  AUTH: {
    ME: "/auth",
    get LOGIN() {
      return `${this.ME}/login`;
    },
    get SIGNUP() {
      return `${this.ME}/signup`;
    },
  },
};

export default ROUTES;
