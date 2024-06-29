import {FC} from 'react';
import styles from './AppointmentItem.module.scss';
import {AppointmentDataI} from "../../types.ts";
import {IoAddCircle} from "react-icons/io5";


interface AppointmentItemProps {
  appointment: AppointmentDataI;
  toddleStatus: (id: string) => void;
  removeAppointment: (id: string) => void;
}

const AppointmentItem: FC<AppointmentItemProps> = ({appointment, toddleStatus, removeAppointment}) => {
  const dateTime = appointment.date.split('T');
  dateTime[0] = dateTime[0].replace(/-/g, '/');

  return (
      <div
          onClick={() => toddleStatus(appointment.id)}
          className={styles.AppointmentItem}
      >
        <div>
          <p className={styles.AppointmentItem__patientName}>{appointment.patientName}</p>
          <p className={styles.AppointmentItem__doctorName}>{appointment.doctorName}</p>
        </div>
        <div>
          <p className={styles.AppointmentItem__date}>{`Date: ${dateTime[0]}`}</p>
          <p className={styles.AppointmentItem__time}>{`Time: ${dateTime[1]}`}</p>
        </div>

        {appointment.consulted && (<>
          <div className={styles.AppointmentItem__badge}>Consulted</div>
          <div className={styles.AppointmentItem__tag}></div>
        </>)}

        <IoAddCircle onClick={() => removeAppointment(appointment.id)} className={styles.AppointmentItem__icon}/>
      </div>
  )
};

export default AppointmentItem;
