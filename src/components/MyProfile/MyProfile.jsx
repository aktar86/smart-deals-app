import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const { user: userID } = use(AuthContext);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/users`);
      return res.data?.data;
    },
  });

  const myProfile = users.find((user) => user.email === userID?.email);

  return (
    <div>
      <h2>My Profile</h2>

      {myProfile && (
        <div>
          <h1>{myProfile.name}</h1>
          <p>{myProfile.email}</p>
          <p>{myProfile.phone}</p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
