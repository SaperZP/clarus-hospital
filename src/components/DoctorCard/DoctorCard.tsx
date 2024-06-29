import { FC } from 'react';
import styles from './DoctorCard.module.scss';
import {Doctor} from "../../helpers/data.ts";

interface DoctorCardProps {
  doctor: Doctor;
  onClickHandler: (doctor: Doctor) => void;
}

const DoctorCard: FC<DoctorCardProps> = ({doctor, onClickHandler}) => (
  <div onClick={() => onClickHandler(doctor)} className={styles.card}>
    <img className={styles.card__img} src={doctor.img} alt={`${doctor.name} photo`}/>
    <h3>{doctor.name}</h3>
    <p>{doctor.dep}</p>
  </div>
);

export default DoctorCard;
