const Sentry = require("@sentry/aws-serverless");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: (integrations) => {
    return integrations.filter((integration) => {
      // Uncomment any of these 3 integrations to see the error
      if (
        integration.name === "Http" ||
        integration.name === "AwsLambda" ||
        integration.name === "Aws"
      ) {
        return false;
      }
      return true;
    });
  },
  debug: true,
});

console.log("hello");

function handle() {
  console.log("handle");
}

module.exports = { handle };
