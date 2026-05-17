import { InputNumber, Select } from "antd";

type TPriceFiltersProps = {
  maxPriceCents?: number;
  minPriceCents?: number;
  sortBy?: "priceAsc" | "priceDesc";
  onChangeMaxPrice: (value?: number) => void;
  onChangeMinPrice: (value?: number) => void;
  onChangeSort: (value?: "priceAsc" | "priceDesc") => void;
};

export const PriceFilters = ({
  maxPriceCents,
  minPriceCents,
  sortBy,
  onChangeMaxPrice,
  onChangeMinPrice,
  onChangeSort,
}: TPriceFiltersProps) => (
  <div className="flex w-full flex-col gap-xs md:w-auto md:flex-row">
    <InputNumber
      className="w-full md:w-32"
      min={0}
      onChange={(value) => onChangeMinPrice(typeof value === "number" ? value * 100 : undefined)}
      placeholder="Min PLN"
      value={minPriceCents ? minPriceCents / 100 : undefined}
    />
    <InputNumber
      className="w-full md:w-32"
      min={0}
      onChange={(value) => onChangeMaxPrice(typeof value === "number" ? value * 100 : undefined)}
      placeholder="Max PLN"
      value={maxPriceCents ? maxPriceCents / 100 : undefined}
    />
    <Select
      className="w-full md:w-40"
      allowClear
      onChange={onChangeSort}
      options={[
        { label: "Price ascending", value: "priceAsc" },
        { label: "Price descending", value: "priceDesc" },
      ]}
      placeholder="Sort by price"
      value={sortBy}
    />
  </div>
);
