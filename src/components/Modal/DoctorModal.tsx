import React, {FC, useState} from 'react';
import styles from './doctorModal.module.scss';
import {IoMdClose} from "react-icons/io";
import {AppointmentDataI, Doctor} from "../../types.ts";

interface ModalProps {
  doctor: Doctor;
  onClose: (payload: null) => void;
  addAppointmentHandler: (appointment: AppointmentDataI) => void;
}

const DoctorModal: FC<ModalProps> = ({doctor, onClose, addAppointmentHandler}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addAppointmentHandler({
      id: new Date().toString(),
      patientName: name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date,
      consulted: false,
    })

    onClose(null)
  };

  return (
      <div className={styles.doctorModalContainer}>
        <div className={styles.doctorModal}>
          <div className={styles.doctorModal__header}>
            <h3 className={styles.doctorModal__title}>
              {`Reservation for ${doctor.name}`}
            </h3>

            <IoMdClose className={styles.doctorModal__closeIcon} onClick={() => onClose(null)}/>
          </div>

          <form onSubmit={submitHandler} className={styles.doctorModal__form}>
            <label className={styles.doctorModal__modalFormName} htmlFor="modalFormName">Patient Name</label>
            <input
                className={styles.doctorModal__input}
                id={"modalFormName"}
                type="text" value={name}
                placeholder={"Name"}
                onChange={(event) => setName(event.target.value)}
                required
            />

            <label className={styles.doctorModal__modalFormName} htmlFor={"modalFormDate"}>Date&Time</label>
            <input
                className={styles.doctorModal__input}
                type="datetime-local"
                value={date}
                onChange={(event) => {setDate(event.target.value)}}
                required
            />

            <div className={styles.doctorModal__buttons}>
              <button className={`${styles.doctorModal__button_submit} ${styles.doctorModal__button}`}>Submit</button>
              <button
                  className={`${styles.doctorModal__button_close} ${styles.doctorModal__button}`}
                  onClick={() => onClose(null)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
  )
};

export default DoctorModal;
