import { describe, it, expect } from "vitest";
import { filterProducts } from "./searchFilter";

describe("searchFilter", () => {
    const mockProducts = [
        { id: "1", brand: "Apple", model: "iPhone 15" },
        { id: "2", brand: "Samsung", model: "Galaxy S24" },
        { id: "3", brand: "Apple", model: "iPad Pro" },
        { id: "4", brand: "Google", model: "Pixel 8" }
    ];

    describe("filterProducts", () => {
        it("should return all products when search term is empty", () => {
            const result = filterProducts(mockProducts, "");

            expect(result).toEqual(mockProducts);
        });

        it("should filter products by brand name", () => {
            const result = filterProducts(mockProducts, "Apple");

            expect(result).toHaveLength(2);
            expect(result).toEqual([
                { id: "1", brand: "Apple", model: "iPhone 15" },
                { id: "3", brand: "Apple", model: "iPad Pro" }
            ]);
        });

        it("should filter products by model name", () => {
            const result = filterProducts(mockProducts, "Galaxy");

            expect(result).toHaveLength(1);
            expect(result).toEqual([
                { id: "2", brand: "Samsung", model: "Galaxy S24" }
            ]);
        });

        it("should be case-insensitive", () => {
            const result = filterProducts(mockProducts, "APPLE");

            expect(result).toHaveLength(2);
            expect(result[0].brand).toBe("Apple");
        });

        it("should handle partial matches", () => {
            const result = filterProducts(mockProducts, "iPh");

            expect(result).toHaveLength(1);
            expect(result[0].model).toBe("iPhone 15");
        });

        it("should return empty array when no products match", () => {
            const result = filterProducts(mockProducts, "Nokia");

            expect(result).toEqual([]);
        });

        it("should filter by model when search term matches model", () => {
            const result = filterProducts(mockProducts, "Pixel");

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ id: "4", brand: "Google", model: "Pixel 8" });
        });

        it("should handle empty product array", () => {
            const result = filterProducts([], "Apple");

            expect(result).toEqual([]);
        });

        it("should match numbers in model", () => {
            const result = filterProducts(mockProducts, "15");

            expect(result).toHaveLength(1);
            expect(result[0].model).toBe("iPhone 15");
        });

        it("should filter with single character search term", () => {
            const result = filterProducts(mockProducts, "S");

            expect(result).toHaveLength(1);
            expect(result[0].brand).toBe("Samsung");
        });
    });
});