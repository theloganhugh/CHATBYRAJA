import classes from "./comments.module.css";
import { Fragment } from "react/cjs/react.production.min";
import { useState } from "react";
function Comments(c) {
  function closemodel() {
    setconfirmdelete(false);
  }
  function viewconfirmdel() {
    setconfirmdelete(true);
  }
  const [confirmdelete, setconfirmdelete] = useState(false);
  async function deletecom(event) {
    setconfirmdelete(false);
    const comdata = {
      user: c.user.username,
      comid: c.id,
      postid: c.postid,
    };
    c.handler(comdata);
  }
  return (
    <Fragment>
      {confirmdelete && (
        <div className={classes.modelback}>
          <div className={classes.confirmdel}>
            Are you sure you want to delete the comment
            <button className={classes.btn} onClick={deletecom}>
              Delete
            </button>
            <button className={classes.btn} onClick={closemodel}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className={classes.com}>
        <span className={classes.comuser}>{c.username}</span>
        {c.body || ""}
        {c.username === c.user.username && (
          <span className={classes.commenu}>
            <img
              className={classes.commenu}
              onClick={viewconfirmdel}
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTMxLjQ5NzUsMjEuNzE1bC05Ljc4MjUsOS43ODI1bDU0LjUwMjUsNTQuNTAyNWwtNTQuODI1LDU0LjkzMjVsOS42NzUsOS42NzVsNTQuOTMyNSwtNTQuODI1bDU0LjgyNSw1NC44MjVsOS43ODI1LC05Ljc4MjVsLTU0LjgyNSwtNTQuODI1bDU0LjUwMjUsLTU0LjUwMjVsLTkuNzgyNSwtOS43ODI1bC01NC41MDI1LDU0LjUwMjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
            />
          </span>
        )}
      </div>
    </Fragment>
  );
}

export default Comments;
