import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/profileCard";
import Post from "../../components/Post/post";
import Advertisement from "../../components/Advertisement/advertisement";
import api from "../../lib/api";
import { useParams } from "react-router-dom";

const SingleActivity = () => {
  const { id, postId } = useParams();
  console.log(postId);

  const [post, setPost] = useState(null);
  const [ownData, setOwnData] = useState(null);

  const fetchDataOnLoad = async () => {
    try {
      const res = await api.get(`/post/getPostById/${postId}`);
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchDataOnLoad();
    const userInfo = localStorage.getItem("userInfo");
    setOwnData(userInfo ? JSON.parse(userInfo) : null);
  }, [postId]);
  
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={post?.user} />
        </div>
      </div>

      {/* middle side */}
      <div className="w-full py-5 sm:w-[50%] ">
        <div>
          <Post item={post} personalData={ownData} />
        </div>
      </div>

      {/* right side */}
      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default SingleActivity;
