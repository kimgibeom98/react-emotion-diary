import { Link } from "react-router-dom"

const RoutTest = () => {
  return (
    <>
      <Link to={'/'}>HOME</Link>
      <br />
      <Link to={'/diary'}>DIARY</Link>
      <br />
      <Link to={'/new'}>NEW</Link>
      <br />
      <Link to={'/edit'}>EDIT</Link>
    </>
  )
}

export default RoutTest