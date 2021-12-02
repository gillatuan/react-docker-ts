import spinner from 'components/Spinner/imageLoading.gif'

const Spinner = (props) => {
  let toggleSpinner = 'none'
  if (props.loading) {
    toggleSpinner = 'block'
  }

  return (
    <div
      className="loading"
      style={{
        display: toggleSpinner,
      }}
    >
      <img src={spinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
