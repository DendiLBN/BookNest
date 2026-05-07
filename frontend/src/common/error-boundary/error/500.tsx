import { Link } from "react-router-dom";

import { Result } from "antd";

export const Error500 = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/home" type="primary">
          Back Home
        </Link>
      }
    />
  );
};
