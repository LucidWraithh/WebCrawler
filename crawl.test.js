const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test("http://blog.boot.dev/hello should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("http://blog.boot.dev/hello")).toBe("blog.boot.dev/hello");
}) ;

test("http://blog.boot.dev/hello/ should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("http://blog.boot.dev/hello/")).toBe("blog.boot.dev/hello");
}) ;

test("https://blog.boot.dev/hello/ should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("https://blog.boot.dev/hello/")).toBe("blog.boot.dev/hello");
}) ;

test("https://blog.boot.dev/hello should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("https://blog.boot.dev/hello")).toBe("blog.boot.dev/hello");
}) ;
