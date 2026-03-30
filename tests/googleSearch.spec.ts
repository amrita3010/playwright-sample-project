import { test } from '@playwright/test';
import { GoogleActions } from '../pages/google/google_actions';

test('Self-Healing Google Search Test', async ({ page }) => {
  const google = new GoogleActions(page);

  await google.navigate();
  await google.loginByDefaultId()
  await google.verifyUserMenuOptions()
});

test('Print Test1 description', async () => {
  console.log('Print Test1 description:');
});

test('Print Test2 description', async () => {
  console.log('Print Test2 description:');
});

test('Print Test3 description', async () => {
  console.log('Print Test3 description:');
});

test('Print Test4 description', async () => {

  function findSmallestMissingPositive() {
    const orderNumbers = [-1,1,3,2]
    let n = orderNumbers.length;

    for (let i = 0; i < n; i++) {
        while (
            orderNumbers[i] > 0 &&
            orderNumbers[i] <= n &&
            orderNumbers[orderNumbers[i] - 1] !== orderNumbers[i]
        ) {
            let targetIndex = orderNumbers[i] - 1;

            // swap
            let temp = orderNumbers[i];
            orderNumbers[i] = orderNumbers[targetIndex];
            orderNumbers[targetIndex] = temp;
        }
    }

    for (let i = 0; i < n; i++) {
        if (orderNumbers[i] !== i + 1) {
            return i + 1;
        }
    }

    return n + 1;
}
  console.log('Print Test4 description:');
});

test.skip('Print Test5 description', async () => {
  console.log('Print Test5 description:');
});