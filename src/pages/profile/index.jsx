import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function Profile() {
  const [profile, setProfile] = useState();
  const fetchProfile = async () => {
    try {
      const response = axiosInstance.get(``);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div>Profile</div>
    </div>
  );
}

export default Profile;
