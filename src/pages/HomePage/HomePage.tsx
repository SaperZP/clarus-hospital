import styles from './HomePage.module.scss';
import {doctorData} from "../../helpers/data.ts";
import DoctorCard from "../../components/DoctorCard/DoctorCard.tsx";
import {useEffect, useState} from "react";
import DoctorModal from "../../components/Modal/DoctorModal.tsx";
import {AppointmentDataI, Doctor} from "../../types.ts";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem.tsx";

const HomePage = () => {
  const [selectedDoc, setSelectedDoc] = useState<null | Doctor>(null);
  const [appointmentsList, setAppointmentsList] = useState<AppointmentDataI[]>(() => {
    const storedAppointments = localStorage.getItem("appointments");

    if (storedAppointments) {
      return JSON.parse(storedAppointments);
    } else return [];
  });

  const addAppointmentHandler = (newAppointment: AppointmentDataI) => {
    setAppointmentsList((prevState) => [...prevState, newAppointment]);
  };

  const appointmentStatusHandler = (id: string) => {
    setAppointmentsList((prevState) =>
        prevState.map((appointment) =>
            appointment.id === id ? {...appointment, consulted: !appointment.consulted} : appointment
        )
    );
  };

  const appointmentRemoveHandler = (id: string) => {
    setAppointmentsList((prevState) => prevState
        .filter((appointment) => appointment.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointmentsList));
  }, [appointmentsList])

  return (
      <div className={styles.homePage}>
        <h2 className={styles.homePage__title}>Our doctors</h2>
        <div className={styles.homePage__doctorsList}>
          {doctorData.map((doctor) => <DoctorCard onClickHandler={setSelectedDoc} doctor={doctor}/>)}
        </div>

        <div className={styles.homePage__appointments}>
          <h2 className={styles.homePage__title}>Appointment List</h2>

          {appointmentsList.length
              ? (
                  <ul className={styles.homePage__appointmentList}>
                    {appointmentsList.map((appointment) => (
                        <li>
                          <AppointmentItem
                              appointment={appointment}
                              toddleStatus={appointmentStatusHandler}
                              removeAppointment={appointmentRemoveHandler}
                          />
                        </li>
                    ))}
                  </ul>
              )
              : (
                  <div className={styles.homePage__noAppointments}>
                    <p className={styles.homePage__noAppointments__text}>
                      No appointments. Book one!
                    </p>
                    <img
                        className={styles.homePage__noAppointments__img}
                        src="/public/img/appointment.jpg"
                        alt="no appointments"
                    />
                  </div>
              )
          }
        </div>

        {selectedDoc &&
            <DoctorModal
                doctor={selectedDoc}
                onClose={setSelectedDoc}
                addAppointmentHandler={addAppointmentHandler}

            />
        }
      </div>
  )
};

export default HomePage;
