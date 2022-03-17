const core = require("@actions/core");
const github = require("@actions/github");
const getCustomDiff = require("cdk-pretty-diff");
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  getCustomDiff().then(() => {
    console.log(JSON.stringify(self, null, 2));
    core.setOutput("diff", diff);
  });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
