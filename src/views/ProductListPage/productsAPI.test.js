import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getProducts } from "./productsAPI";

describe("productsAPI", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
		localStorage.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.useRealTimers();
	});

	describe("getProducts", () => {
		it("should fetch and store products in localStorage", async () => {
			const mockProducts = [
				{ id: "1", name: "Product 1" },
				{ id: "2", name: "Product 2" }
			];
			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(mockProducts)
			});

			const result = await getProducts();

			expect(result).toBe(JSON.stringify(mockProducts));
			expect(localStorage.getItem("products")).toBe(
				JSON.stringify(mockProducts)
			);
			expect(global.fetch).toHaveBeenCalledWith("/api/product");
		});

		it("should fetch new products if cache expired", async () => {
			const CACHE_DURATION = 60 * 60 * 1000;
			const oldProducts = [{ id: "1", name: "Old Product" }];
			const newProducts = [
				{ id: "1", name: "Product 1" },
				{ id: "2", name: "Product 2" }
			];

			localStorage.setItem("products", JSON.stringify(oldProducts));
			localStorage.setItem(
				"productsTimestamp",
				Date.now() - CACHE_DURATION - 1000
			);

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(newProducts)
			});

			const result = await getProducts();

			expect(result).toBe(JSON.stringify(newProducts));
			expect(global.fetch).toHaveBeenCalledWith("/api/product");
		});

		it("should fetch products if no cache exists", async () => {
			const mockProducts = [
				{ id: "1", name: "Product 1" },
				{ id: "2", name: "Product 2" }
			];

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(mockProducts)
			});

			const result = await getProducts();

			expect(result).toBe(JSON.stringify(mockProducts));
			expect(global.fetch).toHaveBeenCalled();
		});

		it("should throw error when response is not ok", async () => {
			global.fetch.mockResolvedValueOnce({
				ok: false,
				json: vi.fn().mockResolvedValueOnce({})
			});

			await expect(getProducts()).rejects.toThrow(
				"There was an error fetching the products"
			);
		});

		it("should throw error on network failure", async () => {
			global.fetch.mockRejectedValueOnce(new Error("Network error"));

			await expect(getProducts()).rejects.toThrow("Network error");
		});

		it("should update timestamp when storing new products", async () => {
			const mockProducts = [{ id: "1", name: "Product 1" }];
			const now = Date.now();
			vi.setSystemTime(now);

			global.fetch.mockResolvedValueOnce({
				ok: true,
				json: vi.fn().mockResolvedValueOnce(mockProducts)
			});

			await getProducts();

			expect(localStorage.getItem("productsTimestamp")).toBe(now.toString());
		});
	});
});
