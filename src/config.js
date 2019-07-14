const dev = {
  apiGateway: "http://127.0.0.1:8080"
};

const prod = {
  apiGateway: "/api"
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
