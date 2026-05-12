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
      <div className="book-page__details-state">
        <Spin size="large" tip="Loading book details..." />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="book-page__details-state">
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
    <div className="book-page book-page__details">
      <Link to="/book">
        <Button icon={<ArrowLeftOutlined />}>Back to books</Button>
      </Link>

      <section className="book-page__details-hero">
        <img
          src={book.coverImageUrl || book.avatar || fallbackCoverImage}
          alt={book.title}
          className="book-page__details-cover"
        />

        <div className="book-page__details-summary">
          <p className="book-page__eyebrow">Book details</p>
          <h1 className="book-page__title">{book.title}</h1>
          <p className="book-page__subtitle">{book.author}</p>

          <Rate disabled value={book.rate} />

          <div className="book-page__details-metrics">
            {bookMetrics.map((metric) => (
              <div className="book-page__details-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="book-page__details-tags">
            {book.category?.map((category) => (
              <Tag color={tagColors[category] || "green"} key={category}>
                {category}
              </Tag>
            ))}
          </div>

          <div className="book-page__details-actions">
            <Button icon={<ShoppingCartOutlined />} type="primary">
              Add to cart
            </Button>
            <Button icon={<HeartOutlined />}>Save favorite</Button>
          </div>
          <p className="book-page__details-note">
            Preview catalog data before adding this title to a basket or saving it to your reading
            list.
          </p>
        </div>
      </section>

      <section className="book-page__details-panel">
        <Descriptions bordered column={1} size="middle">
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
