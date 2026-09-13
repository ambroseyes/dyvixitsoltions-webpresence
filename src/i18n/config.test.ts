import { describe, expect, test } from "vitest";
import {
  alternatePath,
  isLocale,
  localeFromPathname,
  localePath,
  stripLocale,
} from "./config";

describe("localePath", () => {
  test("leaves English paths unprefixed", () => {
    expect(localePath("en", "/about")).toBe("/about");
    expect(localePath("en", "/")).toBe("/");
  });

  test("prefixes French paths", () => {
    expect(localePath("fr", "/about")).toBe("/fr/about");
    expect(localePath("fr", "/expertise/cybersecurity")).toBe("/fr/expertise/cybersecurity");
  });

  test("maps the French homepage to /fr without a trailing slash", () => {
    expect(localePath("fr", "/")).toBe("/fr");
  });

  test("keeps query strings and hashes on the right side of the prefix", () => {
    expect(localePath("fr", "/contact?scope=cybersecurity")).toBe("/fr/contact?scope=cybersecurity");
    expect(localePath("fr", "/#solution-finder")).toBe("/fr#solution-finder");
    expect(localePath("fr", "/projects#creolink-storage")).toBe("/fr/projects#creolink-storage");
  });

  test("passes external and non-path hrefs through untouched", () => {
    expect(localePath("fr", "mailto:contact@dyvixitsolutions.com")).toBe(
      "mailto:contact@dyvixitsolutions.com",
    );
    expect(localePath("fr", "https://wa.me/237674294455")).toBe("https://wa.me/237674294455");
    expect(localePath("fr", "tel:+237674294455")).toBe("tel:+237674294455");
  });
});

describe("stripLocale and localeFromPathname", () => {
  test("strip the French prefix", () => {
    expect(stripLocale("/fr/about")).toBe("/about");
    expect(stripLocale("/fr")).toBe("/");
    expect(localeFromPathname("/fr/about")).toBe("fr");
    expect(localeFromPathname("/fr")).toBe("fr");
  });

  test("treat unprefixed paths as English", () => {
    expect(stripLocale("/about")).toBe("/about");
    expect(localeFromPathname("/about")).toBe("en");
    expect(localeFromPathname("/")).toBe("en");
  });

  test("do not mistake a path that merely starts with 'fr' for a locale", () => {
    expect(localeFromPathname("/french-press")).toBe("en");
    expect(stripLocale("/frx")).toBe("/frx");
  });
});

describe("alternatePath", () => {
  test("switches a page between languages", () => {
    expect(alternatePath("/about", "fr")).toBe("/fr/about");
    expect(alternatePath("/fr/about", "en")).toBe("/about");
    expect(alternatePath("/", "fr")).toBe("/fr");
    expect(alternatePath("/fr", "en")).toBe("/");
  });

  test("is a no-op when the target is the current language", () => {
    expect(alternatePath("/fr/projects", "fr")).toBe("/fr/projects");
  });
});

describe("isLocale", () => {
  test("accepts supported locales only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
