import { isPageValid } from "../../Utils/ValidePages";

describe("isPageValid function", () => {
  test("returns true for a valid page", () => {
    expect(isPageValid("connexion")).toBe(true);
  });

  test("returns false for an invalid page", () => {
    expect(isPageValid("invalidPage")).toBe(false);
  });

  test("returns true for an empty page (root)", () => {
    expect(isPageValid("")).toBe(true);
  });

  test("is case insensitive", () => {
    expect(isPageValid("NFT")).toBe(true);
  });

  test("returns false for an striing with one espace", () => {
    expect(isPageValid(" ")).toBe(false);
  });
});
