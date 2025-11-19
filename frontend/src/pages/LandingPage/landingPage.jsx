import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginComp from "../../components/GoogleLogin/googleLoginComp";

const LandingPage = (props) => {
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <div className="my-8 py-[50px] md:px-[120px] px-5 md:flex justify-between gap-10">
        <div className="md:w-[45%] flex flex-col items-center md:items-start">
          <div className="text-4xl md:text-5xl font-bold text-center md:text-left bg-linear-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text leading-tight">
            Welcome to your <br /> professional community
          </div>

          <div className="flex mx-auto md:mx-0 mt-7 py-2 px-2 w-[80%] md:w-[70%]">
            <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
          </div>

          <Link
            to={"/login"}
            className="flex mx-auto md:mx-0 mt-4 py-2.5 px-4 bg-white border border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:bg-purple-50 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]
    transition-all duration-200 text-gray-700 font-medium rounded-4xl w-[80%] md:w-[70%] justify-center cursor-pointer"
          >
            Sign in with Email
          </Link>

          <div className="mx-auto md:mx-0 mb-4 text-sm w-[80%] md:w-[70%] mt-6 text-gray-600 leading-relaxed">
            By continuing, you agree to Networx’s{" "}
            <span className="text-purple-700 hover:underline cursor-pointer">
              User Agreement
            </span>
            ,{" "}
            <span className="text-purple-700 hover:underline cursor-pointer">
              Privacy Policy
            </span>
            , and{" "}
            <span className="text-purple-700 hover:underline cursor-pointer">
              Cookie Policy
            </span>
            .
          </div>

          <Link
            to={"/signup"}
            className="mx-auto md:mx-0 text-center text-lg w-[80%] md:w-[70%] mt-2"
          >
            New to Networx?{" "}
            <span className="text-purple-700 font-semibold hover:underline cursor-pointer">
              Join now
            </span>
          </Link>
        </div>

        <div className="md:w-[50%] mt-10 md:mt-0 flex items-center justify-center">
          <img
            alt="networking"
            className="w-full h-auto rounded-xl shadow-lg shadow-purple-200"
            src={
              "Black and Cream Simple Corporate Networking Event Facebook Post.png"
            }
          />
        </div>
      </div>

      {/* ================= SECTION 2: People / Topics ================= */}
      <div className="bg-gray-50 py-16 px-5 md:px-[120px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-left">
          Explore topics you care about
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Technology",
            "Business",
            "Design",
            "Marketing",
            "Startups",
            "Leadership",
            "Career Growth",
            "Networking",
          ].map((topic) => (
            <div
              key={topic}
              className="p-5 bg-white shadow-md rounded-xl border border-gray-300 hover:shadow-xl hover:border-purple-400 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-gray-700">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 3: Why Join ================= */}
      <div className="py-20 px-5 md:px-[120px]">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why join Networx?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-300 text-center">
            <h3 className="font-bold text-xl text-purple-700 mb-3">
              Grow Your Career
            </h3>
            <p className="text-gray-600">
              Discover opportunities tailored to your goals and connect with
              professionals worldwide.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-300 text-center">
            <h3 className="font-bold text-xl text-purple-700 mb-3">
              Build Meaningful Connections
            </h3>
            <p className="text-gray-600">
              Engage with experts, mentors, and peers to expand your network.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-300 text-center">
            <h3 className="font-bold text-xl text-purple-700 mb-3">
              Stay Updated
            </h3>
            <p className="text-gray-600">
              Follow people, companies, and industries to stay ahead of trends.
            </p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 4: Explore Opportunities ================= */}
      <div className="bg-purple-50 py-16 px-5 md:px-[120px] rounded-t-3xl">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-10">
          Discover your next opportunity
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["Jobs", "People", "Learning"].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-300 shadow-md rounded-xl p-6 hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer"
            >
              <h3 className="font-bold text-xl text-gray-800 mb-2">{item}</h3>
              <p className="text-gray-600">
                Find the right {item.toLowerCase()} to help you grow.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 5: Final CTA ================= */}
      <div className="py-20 px-5 md:px-[120px] text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Join Networx today
        </h2>
        <Link
          to="/signup"
          className="inline-block px-10 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-3xl text-lg shadow-md hover:shadow-xl transition-all"
        >
          Get started for free
        </Link>
        <p className=" text-gray-700 mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nobis.
          Ut fugit odit accusamus animi rerum laborum minus sed, facilis
          assumenda possimus voluptas aliquam, voluptatum ipsa esse omnis optio
          cumque?
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
