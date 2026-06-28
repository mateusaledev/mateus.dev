import fs from "fs";
import os from "os";
import path from "path";
import { describe, expect, it } from "vitest";
import { getBlogPost, getProjectBySlug } from "./content";
import {
  SECURITY_HEADERS,
  isSafeExternalUrl,
  isValidSlug,
  resolvePathWithinBase,
} from "./security";

describe("isValidSlug", () => {
  it("aceita slugs válidos em kebab-case", () => {
    expect(isValidSlug("kafka-introducao")).toBe(true);
    expect(isValidSlug("mk-portifolio")).toBe(true);
    expect(isValidSlug("hexagonal-architecture")).toBe(true);
  });

  it("rejeita path traversal e caracteres perigosos", () => {
    const maliciousSlugs = [
      "../projects/mk-portifolio",
      "..\\..\\etc\\passwd",
      "foo/bar",
      "foo\\bar",
      "..",
      ".",
      "slug%2e%2e",
      "slug;DROP TABLE",
      "<script>alert(1)</script>",
      "",
      "a".repeat(129),
    ];

    for (const slug of maliciousSlugs) {
      expect(isValidSlug(slug)).toBe(false);
    }
  });

  it("rejeita slugs com maiúsculas ou underscores", () => {
    expect(isValidSlug("Kafka-Introducao")).toBe(false);
    expect(isValidSlug("my_post")).toBe(false);
  });
});

describe("resolvePathWithinBase", () => {
  it("permite arquivos dentro do diretório base", () => {
    const base = path.join(os.tmpdir(), "content-test-base");
    const result = resolvePathWithinBase(base, "blog", "pt", "post.mdx");

    expect(result).toBe(path.resolve(base, "blog", "pt", "post.mdx"));
  });

  it("bloqueia path traversal", () => {
    const base = path.join(os.tmpdir(), "content-test-base");

    expect(resolvePathWithinBase(base, "..", "etc", "passwd")).toBeNull();
    expect(resolvePathWithinBase(base, "blog", "..", "..", "secret.mdx")).toBeNull();
  });
});

describe("isSafeExternalUrl", () => {
  it("aceita http, https e mailto", () => {
    expect(isSafeExternalUrl("https://github.com/user/repo")).toBe(true);
    expect(isSafeExternalUrl("http://example.com")).toBe(true);
    expect(isSafeExternalUrl("mailto:contact@example.com")).toBe(true);
  });

  it("rejeita schemes perigosos (XSS via href)", () => {
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("data:text/html,<script>alert(1)</script>")).toBe(
      false
    );
    expect(isSafeExternalUrl("vbscript:msgbox")).toBe(false);
    expect(isSafeExternalUrl("not-a-url")).toBe(false);
  });
});

describe("getBlogPost — proteção contra path traversal", () => {
  it("retorna undefined para slugs maliciosos", () => {
    const payloads = [
      "../projects/mk-portifolio",
      "..%2F..%2Fprojects%2Fmk-portifolio",
      "../../site/about.pt.json",
      "foo/bar",
    ];

    for (const slug of payloads) {
      expect(getBlogPost("pt", slug)).toBeUndefined();
      expect(getBlogPost("en", slug)).toBeUndefined();
    }
  });

  it("não expõe posts com published: false via slug válido inexistente", () => {
    expect(getBlogPost("pt", "arquitetura-hexagonal")).toBeUndefined();
    expect(getBlogPost("en", "hexagonal-architecture")).toBeUndefined();
  });
});

describe("getProjectBySlug — lookup seguro", () => {
  it("retorna undefined para slugs maliciosos", () => {
    expect(getProjectBySlug("../blog/pt/post")).toBeUndefined();
    expect(getProjectBySlug("'; DROP TABLE projects;--")).toBeUndefined();
  });

  it("encontra projetos existentes por slug exato", () => {
    const project = getProjectBySlug("mk-portifolio");
    expect(project).toBeDefined();
    expect(project?.slug).toBe("mk-portifolio");
  });
});

describe("SQL Injection", () => {
  it("não há camada de banco — payloads SQL são tratados como strings opacas", () => {
    const sqlPayloads = [
      "' OR '1'='1",
      "1; DROP TABLE users--",
      "UNION SELECT * FROM secrets",
    ];

    for (const payload of sqlPayloads) {
      expect(getBlogPost("pt", payload)).toBeUndefined();
      expect(getProjectBySlug(payload)).toBeUndefined();
    }
  });
});

describe("SECURITY_HEADERS", () => {
  it("inclui headers essenciais contra clickjacking e MIME sniffing", () => {
    const keys = SECURITY_HEADERS.map((h) => h.key);

    expect(keys).toContain("X-Frame-Options");
    expect(keys).toContain("X-Content-Type-Options");
    expect(keys).toContain("Strict-Transport-Security");
    expect(keys).toContain("Content-Security-Policy");
    expect(keys).toContain("Referrer-Policy");
  });

  it("CSP bloqueia object-src e restringe frame-ancestors", () => {
    const csp = SECURITY_HEADERS.find((h) => h.key === "Content-Security-Policy");

    expect(csp?.value).toContain("object-src 'none'");
    expect(csp?.value).toContain("frame-ancestors 'self'");
  });
});

describe("Arquivos sensíveis não versionados", () => {
  it(".gitignore cobre arquivos .env", () => {
    const gitignore = fs.readFileSync(
      path.join(process.cwd(), ".gitignore"),
      "utf-8"
    );

    expect(gitignore).toMatch(/\.env\*/);
  });
});
