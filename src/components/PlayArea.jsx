// Card Design
import CardDesign from '../assets/icons/backdesign.png';

const PlayArea = ({ onStart, onReset, onSelectColumn }) => {

  return (
    <section id="playArea">
      {/* Buttons */}
      <div className="buttons-area">
        <button className="play-again-btn" onClick={onReset}>
          Play Again
        </button>
        <div className="col-btn c1" id="col1" onClick={onSelectColumn}>
          <span>1st</span>
        </div>
        <div className="col-btn c2" id="col2" onClick={onSelectColumn}>
          <span>2nd</span>
        </div>
        <div className="col-btn c3" id="col3" onClick={onSelectColumn}>
          <span>3rd</span>
        </div>  
        <div className="deck-stacked" onClick={onStart}>
          <img src={CardDesign} alt="Deck of Cards"/>
        </div>
      </div>
      <div className="cards-area">
        
      </div>
    </section>
  )
}

export default PlayArea;