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

test.skip('Print Test4 description', async () => {
  console.log('Print Test4 description:');
});

test('Print Test5 description', async () => {
  console.log('Print Test5 description:');
});