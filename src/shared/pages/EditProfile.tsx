import React from "react";
import Avatar from "../components/UIElements/Avatar.tsx";
import EditInformation from "../components/Profile/EditInformation";

interface EditProfileProps {
  id: string;
  name: string;
  department: string;
  researchCenter: string;
  description: string;
  email: string;
  role: string;
  image: string;
}

const EditProfile = ({
  id,
  name,
  department,
  researchCenter,
  description,
  email,
  role,
  image,
}: EditProfileProps) => {
  return (
    <section>
      <div className="flex gap-5">
        <Avatar name={name} img={image} />
        <EditInformation
          id={id}
          name={name}
          description={description}
          email={email}
          role={role}
          image={image}
          department={department}
          researchCenter={researchCenter}
        />
      </div>
    </section>
  );
};

export default EditProfile;
