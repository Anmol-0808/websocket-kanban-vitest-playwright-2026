import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, request }) => {
  await request.post("http://localhost:5000/reset");
  await page.goto("http://localhost:3000");
});

test("User can create a task", async ({ page }) => {
  await page.getByText("Add Task").click();

  await page.getByTestId("title-input").fill("E2E Task");

  await page.getByTestId("submit-btn").click();

  await expect(
    page.locator(".card", { hasText: "E2E Task" })
  ).toBeVisible({ timeout: 5000 });
});


test("User can edit a task", async ({ page }) => {
  await page.getByText("Add Task").click();
  await page.getByTestId("title-input").fill("Edit Me");
  await page.getByTestId("submit-btn").click();

  const taskCard = page.locator(".card", { hasText: "Edit Me" });
  await taskCard.dblclick();

  await page.getByTestId("title-input").fill("Edited Task");
  await page.getByTestId("submit-btn").click();

  await expect(page.getByText("Edited Task")).toBeVisible();
});

test("User can delete a task", async ({ page }) => {
  await page.getByText("Add Task").click();
  await page.getByTestId("title-input").fill("Delete Me");
  await page.getByTestId("submit-btn").click();

  const taskCard = page.locator(".card", { hasText: "Delete Me" });
  await taskCard.locator(".delete-icon").click();

  await expect(page.getByText("Delete Me")).not.toBeVisible();
});

test("User can upload an attachment", async ({ page }) => {
  await page.getByText("Add Task").click();
  await page.getByTestId("title-input").fill("Attachment Task");

  // Directly target input[type="file"]
  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles({
    name: "test.png",
    mimeType: "image/png",
    buffer: Buffer.from("fake image content"),
  });

  await page.getByTestId("submit-btn").click();

  await expect(page.getByText("Attachment Task")).toBeVisible();
});

test("Progress chart updates after task creation", async ({ page }) => {
  await page.getByText("Add Task").click();
  await page.getByTestId("title-input").fill("Chart Task");
  await page.getByTestId("submit-btn").click();

  await expect(page.getByText(/% done/)).toBeVisible();
});
