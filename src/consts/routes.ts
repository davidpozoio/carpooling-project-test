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
  ROUTES: {
    ME: "/routes",
    get TRASH() {
      return `${this.ME}/all`;
    },
    get EDITOR() {
      return `${this.ME}/:id`;
    },
    EDITORID(noteId: number) {
      return `${this.ME}/${noteId}`;
    },
    get CREATE() {
      return `${this.ME}/create`;
    },
    get USER_DETAILS() {
      return `${this.ME}/user-details`;
    },
  },
};

export default ROUTES;
