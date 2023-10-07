import React, { memo, useEffect, useRef, useState } from "react";

const LikePart = ({
  mainSubs,
  addSubscriber,
  removeSubscriber,
  likeNumber,
  addLike,
  removeLike,
}) => {
  const [count, setCount] = useState(0);
  const [countChanged, setCountChanged] = useState(false);

  useEffect(() => {
    setCount((prev) => prev + 1);
    setCountChanged(true);
    const timer = setTimeout(() => {
      setCountChanged(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mainSubs, likeNumber]);
  return (
    <div>
      <h1>
        likes: {likeNumber}{" "}
        <p>(handles in parent component, effects on this component)</p>
      </h1>
      <button onClick={addLike}>like</button>
      <button onClick={removeLike}>dislike</button>
      <h2>
        Subscribers: {mainSubs}{" "}
        <p>(handles in parent component, effects on both components)</p>
      </h2>
      <button onClick={addSubscriber}>add subscriber</button>
      <button onClick={removeSubscriber}>remove subscriber</button>
      <br />

      <h2 className={countChanged ? "counter counter-highlight" : "counter"}>
        like part rendered: {count}
      </h2>
    </div>
  );
};

export default memo(LikePart);
