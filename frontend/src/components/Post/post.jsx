import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
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

  useEffect(() => {
    let selfId = personalData?._id;
    if (item?.likes.includes(selfId)) setLiked(true);
  }, []);

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
    } catch {
      toast.error("Error posting comment");
    }
  };

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
    <Card
      padding={0}
      className="mb-5 rounded-2xl shadow-lg border border-purple-100"
    >
      {/* USER HEADER */}
      <div className="flex gap-3 p-4 items-center">
        <Link to={`/profile/${item?.user?._id}`} className="w-12 h-12">
          <img
            src={item?.user?.profilePic}
            className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-sm object-cover"
          />
        </Link>
        <div>
          <div className="text-lg font-semibold text-purple-800">
            {item?.user?.f_name}
          </div>
          <div className="text-sm text-gray-500">{item?.user?.headline}</div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {item?.desc && (
        <div className="px-4 mb-3 text-gray-800 whitespace-pre-line leading-relaxed">
          {seeMore ? item?.desc : item?.desc?.slice(0, 120)}
          {hasLongDesc && (
            <span
              className="cursor-pointer text-purple-600 font-semibold ml-1"
              onClick={() => setSeeMore((p) => !p)}
            >
              {seeMore ? "See Less" : "...See More"}
            </span>
          )}
        </div>
      )}

      {/* IMAGE */}
      {item?.imageLink && (
        <img
          src={item?.imageLink}
          className="w-full max-h-[450px] object-cover mb-2"
        />
      )}

      {/* VIDEO */}
      {item?.videoLink && (
        <video
          controls
          className="w-full max-h-[450px] bg-black mb-2"
        >
          <source src={item?.videoLink} />
        </video>
      )}

      {/* ARTICLE */}
      {item?.article && (
        <div className="px-4 py-3 mt-2 border-t border-purple-100">
          <div className="text-lg font-bold text-purple-700 mb-2">Article</div>
          <div className="text-gray-800 text-sm leading-6 whitespace-pre-line">
            {seeMore ? item?.article : item?.article?.slice(0, 300)}
            {item?.article?.length > 300 && (
              <span
                className="cursor-pointer text-purple-600 font-semibold ml-1"
                onClick={() => setSeeMore((p) => !p)}
              >
                {seeMore ? "Show Less" : "...Read Full Article"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* LIKE + COMMENT COUNT */}
      <div className="flex justify-between p-4 text-gray-600 text-sm border-t border-purple-100">
        <div className="flex items-center gap-1">
          <ThumbUpIcon sx={{ color: "#6366f1", fontSize: 14 }} />
          {noOfLikes} Likes
        </div>
        <div>{item?.comments} Comments</div>
      </div>

      {/* ACTION BUTTONS */}
      {!profile && (
        <div className="flex border-t border-purple-100">
          <ActionButton
            onClick={handleLikeFunc}
            icon={
              liked ? (
                <ThumbUpIcon sx={{ color: "#6366f1" }} />
              ) : (
                <ThumbUpOutlinedIcon />
              )
            }
            text={liked ? "Liked" : "Like"}
          />
          <ActionButton
            onClick={handleCommentBoxOpenClose}
            icon={<CommentIcon />}
            text="Comment"
          />
          <ActionButton
            onClick={copyToClipboard}
            icon={<SendIcon />}
            text="Share"
          />
        </div>
      )}

      {/* COMMENT SECTION */}
      {comment && (
        <div className="p-4">
          <div className="flex gap-2 items-center mb-3">
            <img
              src={personalData?.profilePic}
              className="w-12 h-12 rounded-full"
            />
            <form className="flex w-full gap-2" onSubmit={handleSendComment}>
              <input
                value={commentText}
                onChange={(e) => setCommenttext(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border border-purple-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button className="bg-linear-to-r from-purple-600 to-purple-900 text-white px-4 py-2 rounded-full hover:scale-105 transition-all">
                <SendIcon />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={i}>
                <Link
                  to={`/profile/${c.user?._id}`}
                  className="flex gap-3 items-start"
                >
                  <img
                    src={c.user?.profilePic}
                    className="w-10 h-10 rounded-full border-purple-200"
                  />
                  <div>
                    <div className="font-semibold text-purple-800">
                      {c.user?.f_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {c.user?.headline}
                    </div>
                  </div>
                </Link>
                <div className="ml-13 mt-1.5 font-semibold text-gray-800">{c.comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </Card>
  );
};

// ✅ ActionButton Component
const ActionButton = ({ onClick, icon, text }) => (
  <div
    onClick={onClick}
    className="flex-1 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-purple-50 transition-all rounded-b-lg"
  >
    {icon} <span className="text-purple-700 font-medium">{text}</span>
  </div>
);

export default Post;
