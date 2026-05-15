import { Link, useParams } from "react-router-dom";

import { ArrowLeftOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Descriptions, Empty, Rate, Spin, Tag } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { useFetchBookByIdQuery } from "@/features/book-page/api";
import { tagColors } from "@/features/book-page/consts/book-categories-colors";

const fallbackCoverImage = "/book.png";

export const BookDetails = () => {
  const { bookId = "" } = useParams();

  const {
    data: book,
    isFetching,
    isError,
  } = useFetchBookByIdQuery(bookId, {
    skip: !bookId,
  });

  if (isFetching) {
    return (
      <div className="grid min-h-90 place-items-center gap-s rounded-m border border-app-border bg-app-surface p-l">
        <Spin size="large" tip="Loading book details..." />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="grid min-h-90 place-items-center gap-s rounded-m border border-app-border bg-app-surface p-l">
        <Empty description="Book details could not be loaded." />
        <Link to="/book">
          <Button icon={<ArrowLeftOutlined />}>Back to books</Button>
        </Link>
      </div>
    );
  }

  const categoryCount = book.category?.length ?? 0;
  const primaryCategory = book.category?.[0] ?? "General";
  const bookMetrics = [
    { label: "Rating", value: `${book.rate}/5` },
    { label: "Shelves", value: categoryCount },
    { label: "Primary", value: primaryCategory },
  ];

  return (
    <div className="flex max-w-280 flex-col gap-xl">
      <Link to="/book">
        <Button icon={<ArrowLeftOutlined />}>Back to books</Button>
      </Link>

      <section className="grid gap-l rounded-m border border-app-border bg-app-surface p-m shadow-app-s md:grid-cols-[220px_minmax(0,1fr)]">
        <img
          src={book.coverImageUrl || book.avatar || fallbackCoverImage}
          alt={book.title}
          className="aspect-2/3 w-full rounded-m border border-app-border bg-app-surface-muted object-cover"
        />

        <div className="flex flex-col items-start gap-xs">
          <p className="book-page__eyebrow">Book details</p>
          <h1 className="book-page__title">{book.title}</h1>
          <p className="book-page__subtitle">{book.author}</p>

          <Rate disabled value={book.rate} />

          <div className="grid w-full grid-cols-1 gap-s sm:grid-cols-3">
            {bookMetrics.map((metric) => (
              <div
                className="min-w-0 rounded-m border border-app-border bg-app-surface-muted p-m"
                key={metric.label}
              >
                <strong className="block truncate text-base text-app-brand">{metric.value}</strong>
                <span className="mt-0.5 block truncate text-xs text-app-text-muted">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-xs">
            {book.category?.map((category) => (
              <Tag color={tagColors[category] || "green"} key={category}>
                {category}
              </Tag>
            ))}
          </div>

          <div className="flex flex-wrap gap-xs">
            <Button icon={<ShoppingCartOutlined />} type="primary">
              Add to cart
            </Button>
            <Button icon={<HeartOutlined />}>Save favorite</Button>
          </div>
          <p className="m-0 max-w-155 leading-6 text-app-text-muted">
            Preview catalog data before adding this title to a basket or saving it to your reading
            list.
          </p>
        </div>
      </section>

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
    </div>
  );
};
