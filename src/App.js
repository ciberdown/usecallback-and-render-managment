import "./App.scss";
import CommentPart from "./components/commentPart";
import LikePart from "./components/likePart";
import { useCallback, useRef, useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [countChanged, setCountChanged] = useState(false);
  const [subs, setSubs] = useState(0);
  const [commentNumber, setCommentNumber] = useState(0);
  const [likeNumber, setLikeNumber] = useState(0);

  const addSubscriber = useCallback(() => {
    setSubs((prev) => prev + 1);
    console.log("subscriber added");
  }, [subs]);
  useEffect(() => {
    addCount();
    setCountChanged(true);
    const timer = setTimeout(() => {
      setCountChanged(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [likeNumber, commentNumber, subs]);
  const removeSubscriber = useCallback(() => {
    if (subs > 0) {
      setSubs((prev) => prev - 1);
      console.log("subscriber removed");
    }
  }, [subs]);
  const addCount = () => {
    setCount((prev) => prev + 1);
  };
  const addComment = useCallback(() => {
    setCommentNumber((prev) => prev + 1);
  }, [commentNumber]);
  const removeComment = useCallback(() => {
    if (commentNumber > 0) setCommentNumber((prev) => prev - 1);
  }, [commentNumber]);

  const addLike = useCallback(() => {
    setLikeNumber((prev) => prev + 1);
  }, [likeNumber]);
  const removeLike = useCallback(() => {
    if (likeNumber > 0) setLikeNumber((prev) => prev - 1);
  }, [likeNumber]);

  return (
    <div className="App">
      <LikePart
        mainSubs={subs}
        addSubscriber={addSubscriber}
        removeSubscriber={removeSubscriber}
        likeNumber={likeNumber}
        addLike={addLike}
        removeLike={removeLike}
      />
      <CommentPart
        mainSubs={subs}
        addSubscriber={addSubscriber}
        removeSubscriber={removeSubscriber}
        commentNumber={commentNumber}
        addComment={addComment}
        removeComment={removeComment}
      />
      <hr />
      <h1 className={countChanged ? "footer changing" : "footer"}>
        parent rendered: {count}
      </h1>
    </div>
  );
}

export default App;
