import { Link } from "react-router";

const Missing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/about">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
