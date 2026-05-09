import { Link } from "react-router-dom";

import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Rate, Space, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import { TBookBody } from "@/types/types";

import { tagColors } from "@/features/book-page/consts/book-categories-colors";

const fallbackCoverImage = "/book.png";

const { Text } = Typography;

type TCreateBookTableColumnsParams = {
  favoriteBookIds: string[];
  favoriteActionLoading: boolean;
  onToggleFavorite: (bookId: string) => void;
};

export const createBookTableColumns = ({
  favoriteBookIds,
  favoriteActionLoading,
  onToggleFavorite,
}: TCreateBookTableColumnsParams): ColumnsType<TBookBody> => [
  {
    title: "Cover",
    dataIndex: "coverImageUrl",
    width: 96,
    render: (_, record) => (
      <img
        src={record.coverImageUrl || record.avatar || fallbackCoverImage}
        alt={record.title}
        className="book-page__cover"
      />
    ),
  },

  {
    title: "Book",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    render: (_, record) => (
      <Space direction="vertical" size={2}>
        <Text strong>{record.title}</Text>
        <Text type="secondary">{record.author}</Text>
      </Space>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rate",
    key: "rate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.rate - b.rate,
    render: (_, record) => <Rate disabled defaultValue={record.rate} />,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, { category }) => {
      if (!category) return null;
      return (
        <>
          {category.map((cat) => {
            const color = tagColors[cat] || "geekblue";
            return (
              <Tag color={color} key={cat}>
                {cat}
              </Tag>
            );
          })}
        </>
      );
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "Actions",
    render: (_, record) => {
      const isFavorite = favoriteBookIds.includes(record._id);

      return (
        <Space>
          <Button
            icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
            loading={favoriteActionLoading}
            onClick={() => onToggleFavorite(record._id)}
            type={isFavorite ? "primary" : "default"}
          >
            {isFavorite ? "Saved" : "Save"}
          </Button>
          <Button icon={<ShoppingCartOutlined />}>Add to cart</Button>
          <Link to={`/book/${record._id}`}>
            <Button>Details</Button>
          </Link>
        </Space>
      );
    },
  },
];
