import { Link } from "react-router-dom";

import { Result } from "antd";

export const Error404 = () => {
  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/home" type="primary">
          Back Home
        </Link>
      }
    />
  );
};
