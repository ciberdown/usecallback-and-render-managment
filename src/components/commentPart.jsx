import React, { memo, useEffect, useRef, useState } from "react";
import likePart from "./likePart";

function CommentPart({
  mainSubs,
  addSubscriber,
  removeSubscriber,
  commentNumber,
  addComment,
  removeComment,
}) {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [countChanged, setCountChanged] = useState(false);

  useEffect(() => {
    setCount((prev) => prev + 1);
    setCountChanged(true);
    const timer = setTimeout(() => {
      setCountChanged(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [page, mainSubs, commentNumber]);

  const addPage = () => {
    setPage((prev) => prev + 1);
  };

  const removePage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      <hr />
      <h1>
        comments: {commentNumber}{" "}
        <p>(handles in parent component, effects on this component)</p>
      </h1>
      <button onClick={addComment}>add comment</button>
      <button onClick={removeComment}>remove comment</button>
      <h2>
        Subscribers: {mainSubs}{" "}
        <p>(handles in parent component, effects on both components)</p>
      </h2>
      <button onClick={addSubscriber}>add subscriber</button>
      <button onClick={removeSubscriber}>remove subscriber</button>

      <h3>
        page: {page} <p>(handles in this component)</p>
      </h3>
      <button onClick={addPage}>next page</button>
      <button onClick={removePage}>prev page</button>
      <br />

      <h2 className={countChanged ? "counter counter-highlight" : "counter"}>
        comment part rendered: {count}
      </h2>
    </div>
  );
}

export default memo(CommentPart);
