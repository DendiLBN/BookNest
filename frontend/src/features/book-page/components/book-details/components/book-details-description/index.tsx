import { Descriptions } from "antd";

import type { TBook } from "@/features/book-page/types";

type TBookDetailsDescriptionProps = {
  book: TBook;
};

export const BookDetailsDescription = ({ book }: TBookDetailsDescriptionProps) => (
  <section className="rounded-m border border-app-border bg-app-surface p-sm text-app-text">
    <Descriptions
      bordered
      className="[&_.ant-descriptions-item-content]:border-app-border [&_.ant-descriptions-item-content]:bg-app-surface [&_.ant-descriptions-item-content]:text-app-text [&_.ant-descriptions-item-label]:border-app-border [&_.ant-descriptions-item-label]:bg-app-surface-muted [&_.ant-descriptions-item-label]:font-bold [&_.ant-descriptions-item-label]:text-app-text [&_.ant-descriptions-view]:border-app-border"
      column={1}
      size="middle"
    >
      <Descriptions.Item label="Title">{book.title}</Descriptions.Item>
      <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
      <Descriptions.Item label="Rating">{book.rate}/5</Descriptions.Item>
      <Descriptions.Item label="Categories">
        {book.category?.join(", ") || "None"}
      </Descriptions.Item>
    </Descriptions>
  </section>
);
