import { Link, useParams } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { BookDetailsContent } from "@/features/book-page/components/book-details/components/book-details-content";
import { useBookDetails } from "@/features/book-page/components/book-details/hooks/useBookDetails";

export const BookDetails = () => {
  const { bookId = "" } = useParams();
  const bookDetails = useBookDetails(bookId);

  if (bookDetails.isFetching) {
    return (
      <div className="grid min-h-90 place-items-center gap-s rounded-m border border-app-border bg-app-surface p-l">
        <Spin size="large" tip="Loading book details..." />
      </div>
    );
  }

  if (bookDetails.isError || !bookDetails.book) {
    return (
      <div className="grid min-h-90 place-items-center gap-s rounded-m border border-app-border bg-app-surface p-l">
        <Empty description="Book details could not be loaded." />
        <Link to="/book">
          <Button icon={<ArrowLeftOutlined />}>Back to books</Button>
        </Link>
      </div>
    );
  }

  return <BookDetailsContent {...bookDetails} book={bookDetails.book} />;
};
