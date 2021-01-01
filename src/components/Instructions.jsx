const Instructions = ({ instructions }) => {
  return (
    <section id="instructions">
      <div className="container">
        <div className="label">INSTRUCTIONS</div>
        <div className="instruction">{instructions}</div>
      </div>
    </section>
  )
}

export default Instructions;