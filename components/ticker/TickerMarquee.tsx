import Link from "next/link";

export interface TickerItem {
  text: string;
  href?: string;
}

export function TickerMarquee({ items }: { items: TickerItem[] }) {
  const renderItems = (keyPrefix: string) =>
    items.map((item, i) => {
      const key = `${keyPrefix}-${i}`;
      const inner = (
        <span className="data-num inline-flex items-center gap-3 whitespace-nowrap px-6 text-sm text-paper">
          <span className="text-hazard" aria-hidden="true">
            &#9632;
          </span>
          {item.text}
        </span>
      );
      return item.href ? (
        <Link key={key} href={item.href} className="hover:text-hazard">
          {inner}
        </Link>
      ) : (
        <span key={key}>{inner}</span>
      );
    });

  return (
    <div className="marquee-row overflow-hidden border-y border-void-line bg-void py-3">
      <div className="marquee-track">
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
}
