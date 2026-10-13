import { describe, it, expect } from "vitest";
import { publicNews, applyNewsChange } from "./cms-rules";
const post = { slug: "berita-sekolah", title: "Berita", date: "2026-10-13", image: "https://example.com/photo.jpg", category: "Kegiatan", excerpt: "Ringkasan", body: ["Isi berita"], type: "news", status: "published", pinned: false };
describe("School post access", () => {
  it("keeps drafts out of public results", () => {
    expect(publicNews([post, { ...post, slug: "draft", status: "draft" }]).map(item => item.slug)).toEqual(["berita-sekolah"]);
  });
  it("rejects pinning a draft", () => {
    expect(() => applyNewsChange([{ ...post, status: "draft" }], "PATCH", { slug: post.slug, pinned: true }, "Admin")).toThrow();
  });
  it("rejects pinning a bulletin", () => {
    expect(() => applyNewsChange([{ ...post, type: "bulletin" }], "PATCH", { slug: post.slug, pinned: true }, "Admin")).toThrow();
  });
  it("rejects duplicate slugs on creation", () => {
    expect(() => applyNewsChange([post], "POST", { item: post }, "Admin")).toThrow();
  });
});