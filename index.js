const Sentry = require("@sentry/aws-serverless");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: (integrations) => {
    return integrations.filter((integration) => {
      // Uncomment any of these 3 integrations to see the error
      // if (
      //   // integration.name === "Http" ||
      //   integration.name === "AwsLambda" ||
      //   integration.name === "Aws"
      // ) {
      //   return false;
      // }
      return true;
    });
  },
  tracesSampleRate: 1.0,
  beforeSendTransaction: (transaction) => {
    console.log("beforeSendTransaction", transaction);
    return transaction;
  },
  debug: true,
});

const http = require("http");
console.log("hello");

function handle() {
  Sentry.startSpanManual({ name: "test", op: "test" }, (span) => {
    http.get("http://example.com", (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        process.stdout.write(d);
      });

      res.on("end", () => {
        span.end();
      });
    });
  });
}

handle();

module.exports = { handle };
