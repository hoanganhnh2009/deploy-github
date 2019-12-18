class DataService {
  constructor(url, body) {
    this.url = url;
    this.body = body;
  }
  async get(uri) {
    try {
      const dynamic_key = window.localStorage.getItem("dynamic_key");
      let response = await fetch(
        `https://new.abitstore.vn/${uri}?dynamic_key=${dynamic_key}`
      );
      let responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      return {
        error: {
          reason: "Rất tiếc, có lỗi xảy ra.",
          type: "LOI_KHONG_XAC_DINH",
          code: 400
        }
      };
    }
  }
  post() {}
  put() {}
  patch() {}
  delete() {}
}

export default DataService;
