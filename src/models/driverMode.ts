export interface DriverDetails {
  driverLicence: string;
}

export interface DriverVehicle {
  plate: string;
  color: string;
  model: string;
}

export interface DriverPostRequest {
  driver: DriverDetails;
  vehicle: DriverVehicle;
}
