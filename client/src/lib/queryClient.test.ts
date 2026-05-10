import { describe, it, mock, afterEach } from "node:test";
import assert from "node:assert";
import { apiRequest } from "./queryClient.ts";

describe("apiRequest", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it("should send a GET request without body", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        statusText: "OK",
      });
    });

    const res = await apiRequest("GET", "/api/test");

    assert.strictEqual(fetchMock.mock.calls.length, 1);
    const callArgs = fetchMock.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], "/api/test");
    assert.deepStrictEqual(callArgs[1], {
      method: "GET",
      headers: {},
      body: undefined,
      credentials: "include",
    });

    assert.strictEqual(res.status, 200);
  });

  it("should send a POST request with JSON body", async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => {
      return new Response(JSON.stringify({ success: true }), {
        status: 201,
      });
    });

    const payload = { test: "data" };
    const res = await apiRequest("POST", "/api/data", payload);

    assert.strictEqual(fetchMock.mock.calls.length, 1);
    const callArgs = fetchMock.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], "/api/data");
    assert.deepStrictEqual(callArgs[1], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    assert.strictEqual(res.status, 201);
  });

  it("should throw an error with text message when response is not ok", async () => {
    mock.method(globalThis, "fetch", async () => {
      return new Response("Invalid input", {
        status: 400,
        statusText: "Bad Request",
      });
    });

    await assert.rejects(
      () => apiRequest("POST", "/api/data", { foo: "bar" }),
      {
        message: "400: Invalid input",
      },
    );
  });

  it("should throw an error with statusText when response is not ok and no text is provided", async () => {
    mock.method(globalThis, "fetch", async () => {
      // Mock a response that returns empty text
      const res = new Response("", {
        status: 500,
        statusText: "Internal Server Error",
      });
      // Ensure text() resolves to empty string
      res.text = async () => "";
      return res;
    });

    await assert.rejects(() => apiRequest("GET", "/api/crash"), {
      message: "500: Internal Server Error",
    });
  });
});
