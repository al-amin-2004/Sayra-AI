"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="text-[15px] leading-7 text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* ---------------- Paragraph ---------------- */

          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,

          /* ---------------- Headings ---------------- */

          h1: ({ children }) => (
            <h1 className="mb-4 mt-7 text-2xl font-bold leading-tight first:mt-0">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-semibold leading-tight">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-lg font-semibold leading-tight">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 font-semibold">{children}</h4>
          ),

          /* ---------------- Bold ---------------- */

          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),

          /* ---------------- Italic ---------------- */

          em: ({ children }) => <em className="italic">{children}</em>,

          /* ---------------- Lists ---------------- */

          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
          ),

          li: ({ children }) => <li className="pl-1">{children}</li>,

          /* ---------------- Links ---------------- */

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-70"
            >
              {children}
            </a>
          ),

          /* ---------------- Blockquote ---------------- */

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-border pl-4 text-muted-foreground">
              {children}
            </blockquote>
          ),

          /* ---------------- Divider ---------------- */

          hr: () => <hr className="my-6 border-border" />,

          /* ---------------- Inline Code ---------------- */

          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            const code = String(children).replace(/\n$/, "");

            // Inline code
            if (!match) {
              return (
                <code
                  className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px]"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Code block
            return <CodeBlock code={code} language={match[1]} />;
          },

          /* ---------------- Pre ---------------- */

          pre: ({ children }) => <>{children}</>,

          /* ---------------- Tables ---------------- */

          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),

          tbody: ({ children }) => <tbody>{children}</tbody>,

          tr: ({ children }) => (
            <tr className="border-b border-border last:border-0">{children}</tr>
          ),

          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold">{children}</th>
          ),

          td: ({ children }) => <td className="px-4 py-3">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

/* ================================================== */
/* Code Block                                         */
/* ================================================== */

type CodeBlockProps = {
  code: string;
  language: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-border bg-[#282c34]">
      {/* Header */}

      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
        <span className="text-xs font-medium text-white/60">{language}</span>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "transparent",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
