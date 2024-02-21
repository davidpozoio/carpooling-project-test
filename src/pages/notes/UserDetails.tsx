import { useMutation } from "react-query";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import "./styles/user-details-styles.css";
import { createDriverDetails } from "../../services/driverService";

const UserDetails = () => {
  const { mutate, isLoading } = useMutation(createDriverDetails);

  return (
    <div className="--main-content note-grid">
      <h2 className="gradient-title --medium-title user-details-title">
        User details
      </h2>
      <Form
        fields={{ driverLicense: "", plate: "", color: "", model: "" }}
        onSubmit={(data) => {
          mutate({
            driver: { driverLicence: data["driverLicense"] },
            vehicle: {
              color: data["color"],
              model: data["model"],
              plate: data["plate"],
            },
          });
        }}
      >
        <Input
          label="Driver license: "
          name="driverLicense"
          placeholder=""
          errors={{
            required: {
              value: true,
              message: "driver license is required",
            },
          }}
          type="number"
        />
        <Input
          label="Car plate: "
          name="plate"
          placeholder=""
          errors={{
            required: {
              value: true,
              message: "car plate is required",
            },
          }}
        />
        <Input
          label="Car color: "
          name="color"
          placeholder=""
          errors={{}}
          type="color"
        />
        <Input
          label="Car model: "
          name="model"
          placeholder=""
          errors={{
            required: {
              value: true,
              message: "car model is required",
            },
          }}
        />
        <button className="button --dark" disabled={isLoading}>
          Submit
        </button>
      </Form>
    </div>
  );
};
export default UserDetails;
