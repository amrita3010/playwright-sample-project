import { Page, Locator } from '@playwright/test';

type LocatorConfig = {
  description: string;
  primary: string;
  fallbacks: string[];
  text?: string | null;
};

export async function findWithHealing(
  page: Page,
  locatorConfig: LocatorConfig
): Promise<Locator> {
  const { primary, fallbacks, description, text } = locatorConfig;

  try {
    const element = page.locator(primary);
    await element.waitFor({ timeout: 2000 });
    console.log(`Primary locator worked: ${description}`);
    return element;
  } catch {
    console.log(`Primary locator failed: ${description}`);
  }

  for (const fallback of fallbacks) {
    try {
      const element = page.locator(fallback);
      await element.waitFor({ timeout: 2000 });
      console.log(`Healed using fallback: ${fallback}`);
      return element;
    } catch {}
  }

  if (text) {
    try {
      const element = page.getByText(text);
      await element.waitFor({ timeout: 2000 });
      console.log(`Healed using text: ${text}`);
      return element;
    } catch {}
  }

    

  throw new Error(`Element not found: ${description}`);
}

