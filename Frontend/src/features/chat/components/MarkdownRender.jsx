import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ children }) {
          return (
            <h1 className="text-4xl font-bold mt-8 mb-5 text-white">
              {children}
            </h1>
          );
        },

        h2({ children }) {
          return (
            <h2 className="text-3xl font-semibold mt-7 mb-4 text-white">
              {children}
            </h2>
          );
        },

        h3({ children }) {
          return (
            <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">
              {children}
            </h3>
          );
        },

        p({ children }) {
          return (
            <p className="leading-8 text-zinc-200 my-4">
              {children}
            </p>
          );
        },

        strong({ children }) {
          return (
            <strong className="font-bold text-white">
              {children}
            </strong>
          );
        },

        ul({ children }) {
          return (
            <ul className="list-disc ml-6 my-4 space-y-2">
              {children}
            </ul>
          );
        },

        ol({ children }) {
          return (
            <ol className="list-decimal ml-6 my-4 space-y-2">
              {children}
            </ol>
          );
        },

        li({ children }) {
          return (
            <li className="leading-8">
              {children}
            </li>
          );
        },

        hr() {
          return (
            <hr className="border-zinc-700 my-8" />
          );
        },

        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-zinc-300 my-5">
              {children}
            </blockquote>
          );
        },

        table({ children }) {
          return (
            <div className="overflow-auto my-6">
              <table className="w-full border border-zinc-700">
                {children}
              </table>
            </div>
          );
        },

        thead({ children }) {
          return (
            <thead className="bg-zinc-800">
              {children}
            </thead>
          );
        },

        tbody({ children }) {
          return (
            <tbody>
              {children}
            </tbody>
          );
        },

        tr({ children }) {
          return (
            <tr className="border-b border-zinc-700">
              {children}
            </tr>
          );
        },

        th({ children }) {
          return (
            <th className="text-left px-4 py-3 font-bold">
              {children}
            </th>
          );
        },

        td({ children }) {
          return (
            <td className="px-4 py-3">
              {children}
            </td>
          );
        },

        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  borderRadius: 15,
                  padding: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  fontSize: 14,
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code className="bg-zinc-800 px-2 py-1 rounded text-green-400">
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;