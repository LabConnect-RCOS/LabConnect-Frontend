import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../../staff/components/Input";

interface EditInformationProps {
  className?: string;
  id: string;
  name: string;
  department: string;
  researchCenter: string;
  description: string;
  email: string;
  role: string;
  image: string;
}

interface FormType {
  id: string,
  name: string,
  email: string,
  role: string,
  description: string;
  department: string;
  researchCenter: string;
}

const EditInformation = ({ className, id, name, department, researchCenter, description, email, role, image }: EditInformationProps) => {
  const submitHandler = (data: FormType) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id,
      name: name,
      email: email,
      role: role,
      description,
      department,
      researchCenter
    },
  });

  const forms = (
    <form
      onSubmit={handleSubmit((data) => {
        submitHandler(data);
      })}
      className="flex flex-col gap-2"
    >
      <Input
        label="Description (min. 5 characters)"
        type="textarea"
        name={"description"}
        errors={errors}
        errorMessage={"Description must have at least 5 characters"}
        formHook={{
          ...register("description", {
            required: true,
            minLength: 5,
          }),
        }}
      />
      <input type="submit" className="btn2" value="Save Changes" />
    </form>
  );

  return (
    <div className={`${className} font-light flex flex-col gap-2`}>
      <h2 className="font-extrabold text-5xl">My Profile</h2>
      <div>
        <h3 className="text-lg">ID: {id}</h3>
        <h3 className="text-lg">Name: {name}</h3>
        <h3 className="text-lg">Email: {email}</h3>
        <h3 className="text-lg">Role: {role}</h3>
        <h3 className="text-lg">Department: {department}</h3>
        <h3 className="text-lg">Research Center: {researchCenter}</h3>
        <img src={image} alt={`${name}'s profile`} className="w-32 h-32 rounded-full mt-2" />
      </div>
      {forms}

    </div>
  );
};

export default EditInformation;
