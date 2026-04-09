import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test, { after, before } from "node:test";

const BASE_URL = "http://127.0.0.1:3000";
let serverProcess;

async function waitForServer(url, timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is still booting.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Server was not ready after ${timeoutMs}ms`);
}

before(async () => {
  serverProcess = spawn(process.execPath, ["index.js"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DB_NAME: process.env.DB_NAME ?? "db_exercicio",
      DB_USER: process.env.DB_USER ?? "postgres",
      DB_PASSWORD: process.env.DB_PASSWORD ?? "1234",
      DB_HOST: process.env.DB_HOST ?? "127.0.0.1",
      DB_DIALECT: process.env.DB_DIALECT ?? "postgres"
    },
    stdio: "inherit"
  });

  await waitForServer(`${BASE_URL}/usuarios`);
});

after(() => {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM");
  }
});

test("GET /usuarios returns 200 and an array", async () => {
  const response = await fetch(`${BASE_URL}/usuarios`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body));
});
