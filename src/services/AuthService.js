class AuthService {
  constructor(url) {
    this.url = url;
  }
  async login(user_name, user_password) {
    try {
      const response = await fetch("https://new.abit.vn/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify([
          {
            user_name,
            user_password,
            internal_ip: "",
            external_ip: ""
          }
        ])
      });
      const responseJson = await response.json();
      if (responseJson.status === "success")
        return {
          ...responseJson,
          success: true,
        };
      return {
        error: {
          message: responseJson.error.message
        }
      };
    } catch (error) {
      return {
        error: {
          message: `Rất tiếc, đã xảy ra lỗi.`
        }
      };
    }
  }
}

export default AuthService;
