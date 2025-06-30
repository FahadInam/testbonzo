// src/utils/internetStabilityChecker.js
import { ALERT, APP_INTERNAL_MESSAGES } from 'Constants';
import { Toast, User } from 'Actions';

const url = 'https://lmsapi.knowledgeplatform.com/api/internet/check'; // URL to ping
const interval = 1000; // Interval between checks in milliseconds
const timeoutThreshold = 1000; // Timeout threshold in milliseconds
const maxChecks = 7; // Number of checks to perform per cycle
const failureThreshold = 2; // Number of total failures to consider unstable

export function checkInternetStability() {
  if (!User.IsLoggedInUser()) {
    return;
  }
  let failureCount = 0;
  let checkCount = 0;

  // Set an interval to perform checks
  const intervalId = setInterval(async () => {
    if (checkCount >= maxChecks) {
      // Clear interval after completing the cycle
      clearInterval(intervalId);

      if (failureCount > failureThreshold) {
        // console.log('Internet is unstable');

        Toast.Show(APP_INTERNAL_MESSAGES.UNSTABLE_INTERNET, ALERT.WARNING, true);
      } else {
        // console.log('Internet is stable');
      }
      return; // Exit if max checks have been reached
    }

    let duration = 0; // Declare duration here

    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const startTime = new Date().getTime();
      const response = await fetch(url, { signal });
      const endTime = new Date().getTime();
      duration = endTime - startTime;

      if (!response.ok || duration > timeoutThreshold) {
        failureCount++;
      }
    } catch (error) {
      failureCount++;
    }

    checkCount++;

    // Log after checks are performed
    // console.log(`Check ${checkCount}/${maxChecks}: Duration = ${duration}ms, Failures = ${failureCount}`);
  }, interval);
}
