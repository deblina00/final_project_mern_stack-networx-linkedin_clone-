// Post.jsx
import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../lib/api";

const Post = ({ profile, item, personalData }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [noOfLikes, setNoOfLike] = useState(item?.likes.length);
  const [commentText, setCommenttext] = useState("");

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return toast.error("Please enter comment");

    try {
      const res = await api.post("/comment", {
        postId: item?._id,
        comment: commentText,
      });

      setComments([res.data.comment, ...comments]);
      setCommenttext("");
    } catch (err) {
      toast.error("Error posting comment");
    }
  };

  useEffect(() => {
    let selfId = personalData?._id;
    if (item?.likes.includes(selfId)) setLiked(true);
  }, []);

  const handleLikeFunc = async () => {
    try {
      await api.post("/post/likeDislike", { postId: item?._id });

      setLiked((prev) => !prev);
      setNoOfLike((prev) => (liked ? prev - 1 : prev + 1));
    } catch {
      toast.error("Error");
    }
  };

  const handleCommentBoxOpenClose = async () => {
    setComment(true);
    try {
      const { data } = await api.get(`/comment/${item?._id}`);
      setComments(data.comments);
    } catch {
      toast.error("Error loading comments");
    }
  };

  const copyToClipboard = async () => {
    try {
      const link = `${import.meta.env.VITE_FRONTEND_URL}/profile/${
        item?.user?._id
      }/activities/${item?._id}`;
      await navigator.clipboard.writeText(link);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  const hasLongDesc = item?.desc?.length > 120;

  return (
    <Card padding={0}>
      {/* USER HEADER */}
      <div className="flex gap-3 p-4">
        <Link
          to={`/profile/${item?.user?._id}`}
          className="w-12 h-12 rounded-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer object-cover"
            src={item?.user?.profilePic}
          />
        </Link>
        <div>
          <div className="text-lg font-semibold">{item?.user?.f_name}</div>
          <div className="text-xs text-gray-500">{item?.user?.headline}</div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {item?.desc && (
        <div className="text-md px-4 mb-3 whitespace-pre-line leading-relaxed">
          {seeMore ? item?.desc : item?.desc?.slice(0, 120)}
          {hasLongDesc && (
            <span
              className="cursor-pointer text-gray-500 font-semibold"
              onClick={() => setSeeMore((p) => !p)}
            >
              {seeMore ? "  See Less" : "  ...See More"}
            </span>
          )}
        </div>
      )}

      {/* IMAGE */}
      {item?.imageLink && (
        <img
          className="w-full max-h-[450px] object-cover"
          src={item?.imageLink}
        />
      )}

      {/* VIDEO */}
      {item?.videoLink && (
        <video controls className="w-full max-h-[450px] bg-black mt-3 rounded">
          <source src={item?.videoLink} />
        </video>
      )}

      {/* ARTICLE */}
      {item?.article && (
        <div className="px-4 py-3 mt-2 border-t">
          <div className="text-xl font-bold mb-2">Article</div>
          <div className="text-[15px] leading-7 whitespace-pre-line text-gray-800">
            {seeMore ? item?.article : item?.article?.slice(0, 300)}

            {item?.article?.length > 300 && (
              <span
                className="cursor-pointer text-blue-700 font-semibold"
                onClick={() => setSeeMore((p) => !p)}
              >
                {seeMore ? "  Show Less" : "  ...Read Full Article"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* LIKE + COMMENT COUNT */}
      <div className="my-2 p-4 flex justify-between">
        <div className="flex gap-1 items-center">
          <ThumbUpIcon sx={{ color: "blue", fontSize: 12 }} />
          <div className="text-sm text-gray-600">{noOfLikes} Likes</div>
        </div>
        <div className="text-sm text-gray-600">{item?.comments} comments</div>
      </div>

      {/* ACTION BUTTONS */}
      {!profile && (
        <div className="flex p-1">
          <div
            onClick={handleLikeFunc}
            className="w-1/3 flex justify-center gap-2 p-2 border-r cursor-pointer hover:bg-gray-100"
          >
            {liked ? (
              <ThumbUpIcon sx={{ fontSize: 22, color: "blue" }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: 22 }} />
            )}
            <span>{liked ? "Liked" : "Like"}</span>
          </div>

          <div
            onClick={handleCommentBoxOpenClose}
            className="w-1/3 flex justify-center gap-2 p-2 border-r cursor-pointer hover:bg-gray-100"
          >
            <CommentIcon sx={{ fontSize: 22 }} />
            <span>Comment</span>
          </div>

          <div
            onClick={copyToClipboard}
            className="w-1/3 flex justify-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          >
            <SendIcon sx={{ fontSize: 22 }} />
            <span>Share</span>
          </div>
        </div>
      )}

      {/* COMMENT SECTION */}
      {comment && (
        <div className="p-4">
          <div className="flex gap-2 items-center">
            <img
              src={personalData?.profilePic}
              className="w-12 h-12 rounded-full"
            />

            <form className="flex w-full gap-2" onSubmit={handleSendComment}>
              <input
                value={commentText}
                onChange={(e) => setCommenttext(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border p-3 rounded-3xl"
              />
              <button className="bg-blue-800 text-white px-3 rounded-3xl">
                Send
              </button>
            </form>
          </div>

          <div className="mt-4">
            {comments.map((c, i) => (
              <div key={i} className="my-4">
                <Link to={`/profile/${c.user?._id}`} className="flex gap-3">
                  <img
                    src={c.user?.profilePic}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{c.user?.f_name}</div>
                    <div className="text-gray-500 text-sm">
                      {c.user?.headline}
                    </div>
                  </div>
                </Link>
                <div className="px-11 mt-1">{c.comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </Card>
  );
};

export default Post;
