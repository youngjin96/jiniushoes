const REST_API_KEY = "16ce99a040599597211e3d5f0afe3601";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const CLIENT_SECRET = "eF4gI4tNiBWTYdwI0mMPu7JpzYAENkDE";

export { REST_API_KEY, REDIRECT_URI, KAKAO_AUTH_URL, CLIENT_SECRET };