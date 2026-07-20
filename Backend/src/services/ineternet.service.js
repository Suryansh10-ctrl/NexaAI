import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export async function SearchInternet({ query }) {
  console.log("Searching:", query);

  const result = await tavily.search(query,{
    searchDepth:"advanced",
    maxResults:5
    })

        return result.results
        .map(item=>`
        Title:${item.title}

        Content:
        ${item.content}

        URL:${item.url}
        `)
        .join("\n\n")
}