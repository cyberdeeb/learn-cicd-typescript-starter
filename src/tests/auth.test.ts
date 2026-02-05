import { describe, expect, it } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("should return null if no authorization header is provided", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header is not in the correct format", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer someToken" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the API key if authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey mySecretKey",
    };
    expect(getAPIKey(headers)).toBe("mySecretKey");
  });
});
