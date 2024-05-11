import { capitalizeWords, getPastilColor } from "../../Utils/Tools";

describe("capitalizeWords function", () => {
  test("should capitalize each word in a string", () => {
    const input = "hello world";
    const expectedOutput = "Hello World";
    expect(capitalizeWords(input)).toBe(expectedOutput);
  });

  test("should handle single-letter words", () => {
    const input = "a b c";
    const expectedOutput = "A B C";
    expect(capitalizeWords(input)).toBe(expectedOutput);
  });

  test("should handle empty string", () => {
    const input = "";
    const expectedOutput = "";
    expect(capitalizeWords(input)).toBe(expectedOutput);
  });
});

describe("getPastilColor function", () => {
  test('should return yellow for status "pending"', () => {
    const input = "pending";
    const expectedOutput = "bg-[#F2B828]";
    expect(getPastilColor(input)).toBe(expectedOutput);
  });

  test('should return blue for status "shipped"', () => {
    const input = "shipped";
    const expectedOutput = "bg-[#288AF2]";
    expect(getPastilColor(input)).toBe(expectedOutput);
  });

  test('should return green for status "delivered"', () => {
    const input = "delivered";
    const expectedOutput = "bg-[#37F228]";
    expect(getPastilColor(input)).toBe(expectedOutput);
  });

  test('should return red for status "cancelled"', () => {
    const input = "cancelled";
    const expectedOutput = "bg-[#F22828]";
    expect(getPastilColor(input)).toBe(expectedOutput);
  });

  test("should return gray for unknown status", () => {
    const input = "unknown";
    const expectedOutput = "bg-gray-500";
    expect(getPastilColor(input)).toBe(expectedOutput);
  });
});
