import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getProduct } from "./productAPI";

describe("productAPI", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
		localStorage.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.useRealTimers();
	});

	describe("getProduct", () => {
		it("should fetch and store product in localStorage", async () => {
			const mockProduct = { id: "product-1", name: "Test Product" };
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(mockProduct)
			});

			const result = await getProduct("product-1");

			expect(result).toBe(JSON.stringify(mockProduct));
			expect(localStorage.getItem("lastProductViewed")).toBe(
				JSON.stringify(mockProduct)
			);
		});

		it("should fetch new product if cache expired", async () => {
			const oldProduct = { id: "product-1", name: "Old Product" };
			const newProduct = { id: "product-1", name: "New Product" };
			const CACHE_DURATION = 60 * 60 * 1000;

			localStorage.setItem("lastProductViewed", JSON.stringify(oldProduct));
			localStorage.setItem(
				"lastProductViewedTimestamp",
				Date.now() - CACHE_DURATION - 1000
			);

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(newProduct)
			});

			const result = await getProduct("product-1");

			expect(result).toBe(JSON.stringify(newProduct));
			expect(global.fetch).toHaveBeenCalledWith("/api/product/product-1");
		});

		it("should fetch new product if product id differs", async () => {
			const oldProduct = { id: "product-1", name: "Old Product" };
			const newProduct = { id: "product-2", name: "New Product" };

			localStorage.setItem("lastProductViewed", JSON.stringify(oldProduct));
			localStorage.setItem("lastProductViewedTimestamp", Date.now());

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(newProduct)
			});

			const result = await getProduct("product-2");

			expect(result).toBe(JSON.stringify(newProduct));
			expect(global.fetch).toHaveBeenCalled();
		});

		it("should throw error when fetch fails", async () => {
			global.fetch.mockResolvedValueOnce({
				ok: false,
				json: vi.fn().mockResolvedValueOnce({})
			});

			await expect(getProduct("product-1")).rejects.toThrow(
				"There was an error fetching the product"
			);
		});

		it("should throw error on network failure", async () => {
			global.fetch.mockRejectedValueOnce(new Error("Network error"));

			await expect(getProduct("product-1")).rejects.toThrow("Network error");
		});

		it("should update timestamp when storing new product", async () => {
			const mockProduct = { id: "product-1", name: "Test Product" };
			const now = Date.now();
			vi.setSystemTime(now);

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(mockProduct)
			});

			await getProduct("product-1");

			expect(localStorage.getItem("lastProductViewedTimestamp")).toBe(
				now.toString()
			);
		});
	});
});
