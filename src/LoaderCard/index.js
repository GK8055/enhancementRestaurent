import Loader from 'react-loader-spinner'
import './index.css'

const LoaderCard = () => (
  <div className="loader-container">
    <Loader Type="TailSpin" color="black" height="33" width="33"/>
  </div>
)

export default LoaderCard
