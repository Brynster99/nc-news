export default function CommentCard({ comment }) {
  const date = new Date(comment.created_at);

  return (
    <li className="comment-card" key={`comment-${comment.comment_id}`}>
      <h5>{`${
        comment.author
      } at ${date.toLocaleTimeString()}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h5>
      <p>{comment.body}</p>
    </li>
  );
}
