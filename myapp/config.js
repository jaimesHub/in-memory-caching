require('dotenv').config();

const { env } = process;

module.exports = {
	// name: env.APP_NAME,
	// baseUrl: env.APP_BASE_URL,
    // port: env.PORT,
    // redis_url: env.REDIS_URL,
    // paystack_secret_key: env.PAYSTACK_SECRET_KEY
    mock_api_url: env.URL,
    rapid_api_key: env.X_RAPID_API_KEY,
    rapid_api_host: env.X_RAPID_API_HOST,
}