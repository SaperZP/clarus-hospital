export interface Doctor {
  id: number;
  name: string;
  dep: string;
  img: string;
}

export interface AppointmentDataI {
  id: string;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: string;
  consulted: boolean;
}
