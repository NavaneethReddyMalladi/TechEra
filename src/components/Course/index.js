import {Link} from 'react-router-dom'

const Course = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <Link to={`courses/${id}`}>
      <li>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default Course
