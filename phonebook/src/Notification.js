const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === "error") {
    return (
      <div className='error'> 
        {message}
      </div>
    )
  } else {
    return (
      <div className='notice'>
        {message}
      </div>
    )
  }
}

export default Notification;