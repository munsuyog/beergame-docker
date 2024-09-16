import React from "react";

const Profile2 = () => {
  return (
    <div className="w-full   p-4">
      <p className="text-[1.2rem] md:text-left text-center font-semibold">Personal Information</p>
      <div className="flex lg:flex-row flex-col md:w-[100%] w-[100%]     items-start md:items-start  gap-x-6 my-4">
        <div className="flex   justify-start items-center  gap-x-2 ">
          <p className="font-semibold">First Name:</p>
          <p className="text-gray-500">Richard</p>
        </div>
        <div className="flex   justify-start items-center  gap-x-2  ">
          <p className="font-semibold">Last Name :</p>
          <p className="text-gray-500">Doe</p>
        </div>
        <div className="flex   justify-start items-center  gap-x-2  ">
          <p className="font-semibold">Profile Type :</p>
          <p className="text-gray-500">Student</p>
        </div>
        <div className="flex   justify-start items-center  gap-x-2  ">
          <p className="font-semibold">Notification :</p>
          <p className="text-gray-500">abc@gmnail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
