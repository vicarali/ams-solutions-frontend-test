import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { addProductToCart } from "./cartAPI";

describe("addProductToCart", () => {
	beforeEach(() => {
		global.fetch = vi.fn();
		localStorage.clear();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should add product to cart and return count", async () => {
		const mockResponse = { count: 5 };
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce(mockResponse)
		});

		const result = await addProductToCart("product-1", {
			storageCode: "256GB",
			colorCode: "black"
		});

		expect(result).toBe(5);
		expect(localStorage.getItem("cartItemsCount")).toBe("5");
	});

	it("should send correct payload to endpoint", async () => {
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce({ count: 1 })
		});

		await addProductToCart("product-123", {
			storageCode: "128GB",
			colorCode: "red"
		});

		expect(global.fetch).toHaveBeenCalledWith("/api/cart", {
			method: "POST",
			body: JSON.stringify({
				id: "product-123",
				storageCode: "128GB",
				colorCode: "red"
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});
	});

	it("should throw error when response is not ok", async () => {
		global.fetch.mockResolvedValueOnce({
			ok: false,
			json: vi.fn().mockResolvedValueOnce({})
		});

		await expect(
			addProductToCart("product-1", {
				storageCode: "256GB",
				colorCode: "black"
			})
		).rejects.toThrow("There was an error adding the product to the cart");
	});

	it("should throw error when fetch fails", async () => {
		global.fetch.mockRejectedValueOnce(new Error("Network error"));

		await expect(
			addProductToCart("product-1", {
				storageCode: "256GB",
				colorCode: "black"
			})
		).rejects.toThrow("Network error");
	});

	it("should update localStorage with incremental count", async () => {
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: vi.fn().mockResolvedValueOnce({ count: 3 })
		});

		await addProductToCart("product-1", {
			storageCode: "256GB",
			colorCode: "black"
		});

		expect(localStorage.getItem("cartItemsCount")).toBe("3");
	});
});
