import { AdSlot } from "@/components/layout/AdSlot";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import type { Ad } from "@/lib/types";

type ArticleBodyProps = {
  html: string;
  ad?: Ad;
};

function splitAfterParagraphs(html: string, count: number) {
  let cursor = 0;
  let found = 0;
  while (found < count) {
    const next = html.indexOf("</p>", cursor);
    if (next === -1) return { first: html, rest: "" };
    cursor = next + 4;
    found += 1;
  }
  return { first: html.slice(0, cursor), rest: html.slice(cursor) };
}

export function ArticleBody({ html, ad }: ArticleBodyProps) {
  const clean = sanitizeHtml(html);
  const { first, rest } = splitAfterParagraphs(clean, 3);

  return (
    <div>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: first }} />
      {rest.trim() && (
        <>
          {ad && <AdSlot ads={[ad]} className="my-5" />}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: rest }} />
        </>
      )}
    </div>
  );
}
