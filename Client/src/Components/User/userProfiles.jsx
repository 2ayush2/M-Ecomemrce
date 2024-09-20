import { userData } from "../../test/testUser";

const Profile = () => {
  return (
    <div className="my-profile p-8 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">My Profile</h3>

      <div className="container max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="full_name">
          <span className="text-sm text-gray-500">Full Name</span>
          <p className="text-lg font-semibold text-gray-700 mt-1">{userData.fullname}</p>
        </div>

        <div className="email">
          <span className="text-sm text-gray-500">Email Address</span>
          <p className="text-lg font-semibold text-gray-700 mt-1">{userData.emailAddress}</p>
        </div>

        <div className="Mobile">
          <span className="text-sm text-gray-500">Mobile</span>
          <p className="text-lg font-semibold text-gray-700 mt-1">{userData.mobile}</p>
        </div>

        <div className="birthDay">
          <span className="text-sm text-gray-500">Birthday</span>
          <p className="text-lg font-semibold text-gray-700 mt-1">{userData.birthday}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
