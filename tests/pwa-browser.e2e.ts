import { spawn } from "node:child_process";
import { once } from "node:events";
import { resolve } from "node:path";

import { expect, test } from "@playwright/test";

const appBase = "/nocturne-control/";
const appUrl = `http://127.0.0.1:4173${appBase}`;
const preview = spawn(process.execPath, [
  resolve("node_modules/vite/bin/vite.js"),
  "preview",
  "--host", "127.0.0.1",
  "--port", "4173",
], { stdio: "ignore" });

async function stopPreview() {
  if (preview.exitCode !== null) return;
  preview.kill("SIGTERM");
  await once(preview, "exit");
}

test.beforeAll(async () => {
  await expect.poll(async () => {
    try {
      return (await fetch(appUrl)).ok;
    } catch {
      return false;
    }
  }, { timeout: 15_000 }).toBe(true);
});

test.afterAll(stopPreview);

test("reopens deep links and lazy routes offline after the first visit", async ({ context, page }) => {
  await context.addInitScript(() => {
    window.sessionStorage.setItem("nocturne-boot-complete", "true");
  });

  await page.goto(`${appBase}gravemere/vesper`);
  await expect(page.getByRole("heading", { name: "Vesper", level: 1 })).toBeVisible();
  await expect(page).toHaveTitle("Vesper Dossier — Nocturne Control Center");

  const serviceWorkerScope = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;

    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error("Service worker did not take control.")), 10_000);
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.clearTimeout(timeout);
          resolve();
        }, { once: true });
      });
    }

    return registration.scope;
  });
  expect(serviceWorkerScope).toBe(`http://127.0.0.1:4173${appBase}`);

  const cachedUrls = await page.evaluate(async () => {
    const urls: string[] = [];
    for (const cacheName of await caches.keys()) {
      const cache = await caches.open(cacheName);
      urls.push(...(await cache.keys()).map((request) => request.url));
    }
    return urls;
  });
  expect(cachedUrls.some((url) => url.endsWith("/manifest.webmanifest"))).toBe(true);
  expect(cachedUrls.some((url) => url.endsWith("/icons/nocturne-192.png"))).toBe(true);
  expect(cachedUrls.some((url) => url.endsWith("/icons/nocturne-512.png"))).toBe(true);
  expect(cachedUrls.some((url) => url.endsWith("/maps/nocturne-custom-map.svg"))).toBe(true);
  expect(cachedUrls.some((url) => /\/assets\/NocturneMap-[^/]+\.js$/.test(url))).toBe(true);
  expect(cachedUrls.some((url) => /\/assets\/NocturneMap-[^/]+\.css$/.test(url))).toBe(true);

  await stopPreview();

  await page.reload();
  await expect(page.getByRole("heading", { name: "Vesper", level: 1 })).toBeVisible();
  await expect(page).toHaveTitle("Vesper Dossier — Nocturne Control Center");

  await page.goto(`${appBase}map`);
  await expect(page.getByRole("heading", { name: "Nocturne Map", level: 1 })).toBeVisible();
  await expect(page.locator(".nocturne-leaflet-map")).toBeVisible();
  await expect(page.locator(".leaflet-image-layer")).toHaveAttribute("src", /nocturne-custom-map\.svg$/);

  const offlineResources = await page.evaluate(() => ({
    mapScriptLoaded: performance.getEntriesByType("resource").some((entry) =>
      entry.name.includes("/assets/NocturneMap-") && entry.name.endsWith(".js")
    ),
    mapStylesLoaded: [...document.styleSheets].some((styleSheet) =>
      styleSheet.href?.includes("/assets/NocturneMap-")
    ),
  }));
  expect(offlineResources).toEqual({ mapScriptLoaded: true, mapStylesLoaded: true });

  const manifest = await page.evaluate(async () => {
    const manifestUrl = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')?.href;
    if (!manifestUrl) throw new Error("Manifest link is missing.");
    return await (await fetch(manifestUrl)).json() as { icons?: Array<{ sizes?: string }> };
  });
  expect(manifest.icons?.map((icon) => icon.sizes)).toEqual(["192x192", "512x512"]);
});
