import React, { useState, useEffect } from "react";
import Advertisement from "../../components/Advertisement/advertisement";
import Card from "../../components/Card/card";
import EditIcon from "@mui/icons-material/Edit";
import Post from "../../components/Post/post";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal/modal";
import ImageModal from "../../components/ImageModal/imageModal";
import EditinfoModal from "../../components/EditInfoModal/editinfoModal";
import AboutModal from "../../components/AboutModal/aboutModal";
import ExpModal from "../../components/ExpModal/expModal";
import MessageModal from "../../components/MessageModal/messageModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import { toast } from "react-toastify";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageSetModal, setImageModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);

  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [expModal, setExpModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const [ownData, setOwnData] = useState(null);

  const [updateExp, setUpdateExp] = useState({
    clicked: "",
    id: "",
    datas: {},
  });

  const updateExpEdit = (id, data) => {
    setUpdateExp({
      ...updateExp,
      clicked: true,
      id: id,
      data: data,
    });
    setExpModal((prev) => !prev);
  };

  useEffect(() => {
    fetchDataOnLoad();
  }, [id]);

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, postDatas, ownDatas] = await Promise.all([
        api.get(`/auth/user/${id}`),
        api.get(`/post/getTop5Post/${id}`),
        api.get("/auth/self"),
      ]);

      setUserData(userDatas.data.user);
      setPostData(postDatas.data.posts);
      setTotalPosts(postDatas.data.totalPosts);
      setOwnData(ownDatas.data.user);

      localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  const handleMessageModal = () => {
    setMessageModal((prev) => !prev);
  };

  const handleExpModal = () => {
    if (expModal) {
      setUpdateExp({ clicked: "", id: "", datas: {} });
    }
    setExpModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleImageModalOpenClose = () => {
    setImageModal((prev) => !prev);
  };

  const handleOnEditCover = () => {
    setImageModal(true);
    setCircularImage(false);
  };

  const handleCircularimageOpen = () => {
    setImageModal(true);
    setCircularImage(true);
  };

  const handleEditFunc = async (data) => {
    try {
      await api.put("/auth/update", { user: data });
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
  };

  const amIfriend = () => {
    // userData = Merry // ownData = John
    let arr = userData?.friends?.filter((item) => {
      return item === ownData?._id;
    });
    return arr?.length;
  };

  const isInPendingList = () => {
    let arr = userData?.pending_friends?.filter((item) => {
      return item === ownData?._id;
    });
    return arr?.length;
  };

  const isInSelfPendingList = () => {
    let arr = ownData?.pending_friends?.filter((item) => {
      return item === userData?._id;
    });
    return arr?.length;
  };
  const checkFriendStatus = () => {
    if (amIfriend()) {
      return "Disconnect";
    } else if (isInSelfPendingList()) {
      return "Approve Request";
    } else if (isInPendingList()) {
      return "Request Sent";
    } else {
      return "Connect";
    }
  };

  const handleSendFriendRequest = async () => {
    if (checkFriendStatus() === "Request Sent") return;

    if (checkFriendStatus() === "Connect") {
      await api
        .post("/auth/sendFriendReq", { receiver: userData?._id })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    } else if (checkFriendStatus() === "Approve Request") {
      await api
        .post("/auth/acceptFriendRequest", { friendId: userData?._id })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    } else {
      await api
        .delete(`/auth/removeFromFriendList/${userData?._id}`)
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.error);
        });
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.clear();
      window.location.reload();
      window.google.accounts.id.disableAutoSelect();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error);
    }
  };

  const copyToClipboard = async () => {
    try {
      let string = `${import.meta.env.VITE_FRONTEND_URL}/profile/${id}`;
      await navigator.clipboard.writeText(string);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="px-3 md:px-5 xl:px-20 py-5 pt-16 w-full bg-gray-100 pb-20 md:pb-5">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* LEFT MAIN SECTION */}
        <div className="w-full md:w-[70%] py-4">
          {/* COVER SECTION */}
          <div>
            <Card padding={0}>
              <div className="w-full">
                {/* Cover */}
                <div className="relative w-full h-[150px] xs:h-[180px] md:h-[220px]">
                  {/* Edit Cover on Own Profile */}
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute top-4 right-4 bg-white shadow-md p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                      onClick={handleOnEditCover}
                    >
                      <EditIcon />
                    </div>
                  )}

                  <img
                    className="w-full h-full object-cover rounded-t-lg"
                    src={userData?.cover_pic}
                    alt=""
                  />

                  {/* Profile Image */}
                  <div
                    onClick={handleCircularimageOpen}
                    className="absolute -bottom-12 left-4 md:left-6 z-10"
                  >
                    {/* <img
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md cursor-pointer object-cover"
                      src={userData?.profilePic}
                      alt=""
                    /> */}
                    <OptimizedImage
                      src={userData?.profilePic}
                      fill={false}
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md object-cover cursor-pointer"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="mt-16 px-4 md:px-6 pb-6 relative">
                  {userData?._id === ownData?._id && (
                    <div
                      className="absolute top-4 right-4 bg-white shadow p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                      onClick={handleInfoModal}
                    >
                      <EditIcon />
                    </div>
                  )}

                  <h1 className="text-xl md:text-2xl font-semibold">
                    {userData?.f_name}
                  </h1>
                  <p className="text-gray-700 text-sm md:text-base">
                    {userData?.headline}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {userData?.curr_location}
                  </p>

                  <p className="text-purple-700 font-medium cursor-pointer text-sm mt-1">
                    {userData?.friends?.length} Connections
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row justify-between gap-4 mt-5">
                    {/* Left Buttons */}
                    <div className="flex gap-3 flex-wrap">
                      <button className="px-3 py-2 bg-purple-700 text-white text-sm rounded-lg hover:bg-purple-800">
                        Open to
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-2 bg-purple-700 text-white text-sm rounded-lg hover:bg-purple-800"
                      >
                        Share
                      </button>
                      {userData?._id === ownData?._id && (
                        <button
                          onClick={handleLogout}
                          className="px-3 py-2 bg-purple-700 text-white text-sm rounded-lg hover:bg-purple-800"
                        >
                          Logout
                        </button>
                      )}
                    </div>

                    {/* Right Buttons */}
                    <div className="flex gap-3 flex-wrap">
                      {amIfriend() ? (
                        <div
                          onClick={() => setMessageModal(true)}
                          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 text-sm font-medium"
                        >
                          Message
                        </div>
                      ) : null}
                      {userData?._id !== ownData?._id && (
                        <button
                          onClick={handleSendFriendRequest}
                          className="px-3 py-2 bg-purple-700 text-white text-sm rounded-lg hover:bg-purple-800"
                        >
                          {checkFriendStatus()}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ABOUT SECTION */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-lg md:text-xl font-semibold">About</div>
                {userData?._id === ownData?._id && (
                  <div onClick={handleAboutModal} className="cursor-pointer">
                    <EditIcon />
                  </div>
                )}
              </div>
              <p className="text-gray-700 mt-2 text-sm md:text-base">
                {userData?.about}
              </p>
            </Card>
          </div>

          {/* SKILLS SECTION */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="text-lg md:text-xl font-semibold mb-2">
                Skills
              </div>
              <div className="flex gap-3 flex-wrap">
                {userData?.skills?.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-700 text-white text-xs md:text-sm rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* ACTIVITIES */}
          <div className="mt-5">
            <Card padding={2}>
              <div className="text-lg md:text-xl font-semibold mb-2">
                Activities
              </div>

              <div className="overflow-x-scroll flex gap-4 pb-2 no-scrollbar">
                {postData.map((item) => (
                  <div
                    key={item._id}
                    className="min-w-[260px] md:min-w-[320px] h-[550px] cursor-pointer"
                    onClick={() =>
                      navigate(`/profile/${id}/activities/${item?._id}`)
                    }
                  >
                    <Post profile={1} item={item} personalData={ownData} />
                  </div>
                ))}
              </div>

              {totalPosts > 3 && (
                <div className="text-center mt-2">
                  <Link
                    to={`/profile/${id}/activities`}
                    className="text-purple-700 flex justify-center items-center gap-1 hover:underline"
                  >
                    Show all posts <ArrowRightAltIcon />
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-5">
            <Card padding={2}>
              <div className="flex justify-between items-center">
                <div className="text-lg md:text-xl font-semibold">
                  Experience
                </div>
                {userData?._id === ownData?._id && (
                  <div className="cursor-pointer" onClick={handleExpModal}>
                    <AddIcon />
                  </div>
                )}
              </div>

              <div className="mt-3">
                {userData?.experience?.map((item, index) => (
                  <div
                    key={index}
                    className="py-3 border-t border-gray-300 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-sm md:text-lg">
                        {item.designation}
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {item.company_name}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {item.duration}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {item.location}
                      </p>
                    </div>

                    {userData?._id === ownData?._id && (
                      <div
                        onClick={() => updateExpEdit(item._id, item)}
                        className="cursor-pointer text-gray-600 hover:text-gray-800"
                      >
                        <EditIcon />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* RIGHT SIDEBAR (HIDDEN ON MOBILE) */}
        <div className="hidden md:block md:w-[28%]">
          <Advertisement />
        </div>
      </div>

      {/* MODALS */}
      {imageSetModal && (
        <Modal title="Upload Image" closeModal={handleImageModalOpenClose}>
          <ImageModal
            handleEditFunc={handleEditFunc}
            selfData={ownData}
            isCircular={circularImage}
          />
        </Modal>
      )}

      {infoModal && (
        <Modal title="Edit Info" closeModal={handleInfoModal}>
          <EditinfoModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Modal>
      )}

      {aboutModal && (
        <Modal title="Edit About" closeModal={handleAboutModal}>
          <AboutModal handleEditFunc={handleEditFunc} selfData={ownData} />
        </Modal>
      )}

      {expModal && (
        <Modal title="Experience" closeModal={handleExpModal}>
          <ExpModal
            handleEditFunc={handleEditFunc}
            selfData={ownData}
            updateExp={updateExp}
            setUpdateExp={updateExpEdit}
          />
        </Modal>
      )}

      {messageModal && (
        <Modal title="Send Message" closeModal={handleMessageModal}>
          <MessageModal selfData={ownData} userData={userData} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
