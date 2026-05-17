import { useState } from "react";

import { Button, Input } from "antd";

import type { TShippingAddress } from "@/features/orders/types";

type TCheckoutAddressFormProps = {
  isSubmitting: boolean;
  onSubmit: (shippingAddress: TShippingAddress) => void;
};

const initialValues: TShippingAddress = {
  city: "",
  postalCode: "",
  recipientName: "",
  street: "",
};

export const CheckoutAddressForm = ({ isSubmitting, onSubmit }: TCheckoutAddressFormProps) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field: keyof TShippingAddress, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  return (
    <section className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <h2 className="mt-0 mb-s text-lg font-bold text-app-text">Shipping address</h2>
      <div className="grid gap-xs sm:grid-cols-2">
        <Input
          onChange={(event) => handleChange("recipientName", event.target.value)}
          placeholder="Recipient name"
          value={values.recipientName}
        />
        <Input
          onChange={(event) => handleChange("street", event.target.value)}
          placeholder="Street and number"
          value={values.street}
        />
        <Input
          onChange={(event) => handleChange("postalCode", event.target.value)}
          placeholder="Postal code"
          value={values.postalCode}
        />
        <Input
          onChange={(event) => handleChange("city", event.target.value)}
          placeholder="City"
          value={values.city}
        />
      </div>
      <div className="mt-s flex justify-end">
        <Button loading={isSubmitting} onClick={() => onSubmit(values)} type="primary">
          Place order
        </Button>
      </div>
    </section>
  );
};
