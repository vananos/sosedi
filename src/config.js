const dev = {
  apiGateway: "http://192.168.0.11:8080"
};

const prod = {
  apiGateway: "/api"
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
