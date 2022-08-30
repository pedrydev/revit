import { useParams } from 'react-router-dom';

export default function AboutCompany() {
  const { info } = useParams();

  return <h1>Company info: {info}</h1>;
}
