const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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

test("http://farquad:fionanumbah3@blog.boot.dev:8080/hello?q=height#biggerthanyou should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("http://farquad:fionanumbah3@blog.boot.dev:8080/hello?q=height#biggerthanyou")).toBe("blog.boot.dev/hello");
}) ;

test("https://blog.boot.dev:8080/hello should equal blog.boot.dev/hello", () => {
    expect(normalizeURL("https://blog.boot.dev:8080/hello")).toBe("blog.boot.dev/hello");
}) ;

test("<html><body><a href='http://blog.boot.dev'><span>Go to Boot.dev</span></a></body></html> should equal https://blog.boot.dev", () => {
    expect(getURLsFromHTML(
        "<html><body><a href='http://blog.boot.dev'><span>Go to Boot.dev</span></a></body></html>",
        "http://blog.boot.dev")).toStrictEqual(["http://blog.boot.dev/"]);
}) ;

test("<html><body><a href='http://blog.boot.dev'><span>Go to Boot.dev</span></a></body></html> should equal https://blog.boot.dev", () => {
    expect(getURLsFromHTML(
        "<html><body><a href='/xyz'><span>Go to Boot.dev</span></a></body></html>",
        "http://blog.boot.dev")).toStrictEqual(["http://blog.boot.dev/xyz"]);
}) ;

test("<html><body><a href='http://blog.boot.dev'><span>Go to Boot.dev</span></a><a href='/gary'><span>Go to Gary</span></a><a href='/yamum'><span>Go to Your Mom Jokes</span></a></body></html> should equal https://blog.boot.dev", () => {
    expect(getURLsFromHTML(
        "<html><body><a href='http://blog.boot.dev'><span>Go to Boot.dev</span></a><a href='/gary'><span>Go to Gary</span></a><a href='/yamum'><span>Go to Your Mom Jokes</span></a></body></html>",
        "http://blog.boot.dev")).toStrictEqual(["http://blog.boot.dev/","http://blog.boot.dev/gary","http://blog.boot.dev/yamum"]);
});