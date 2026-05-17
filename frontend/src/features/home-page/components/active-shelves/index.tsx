import { TagsOutlined } from "@ant-design/icons";

import type { TActiveShelvesProps } from "@/features/home-page/types";

export const ActiveShelves = ({ categories }: TActiveShelvesProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s">
    <div className="mb-s flex items-start justify-between gap-xs">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Categories</p>
        <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Active shelves</h2>
      </div>
      <TagsOutlined className="text-xl text-app-accent" />
    </div>
    <div className="flex flex-col gap-xs">
      {categories.length > 0 ? (
        categories.map(([category, count]) => (
          <div
            className="flex items-center justify-between gap-xs border-b border-app-border py-2"
            key={category}
          >
            <span className="text-app-text">{category}</span>
            <strong className="text-app-accent">{count}</strong>
          </div>
        ))
      ) : (
        <p className="m-0 text-app-text-muted">Categories will appear after books load.</p>
      )}
    </div>
  </article>
);
