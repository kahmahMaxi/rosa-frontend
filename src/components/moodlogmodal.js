// MoodLogModal.jsx
import React, { useEffect, useState } from "react";


import { useLogmood } from "../hooks/patch/useLogmood";
import CustomRangeSlider from "./rangeSlider";



function MoodLogModal({ showModal, questions }) {

  const { submitMood } = useLogmood()

  const [selectbox, setselectbox] = useState({
    one: null, two: null, three: null, four: null
  })
  const [optionvalue, setoptionvalue] = useState({
    one: null, two: null, three: null, four: null
  })

  const [errorstate, setErrorstate] = useState(null)


  const handleSelectBox = (itemindex) => {
    if (itemindex === 0) {
      if(selectbox.one) {
        setselectbox({ one: null })
      } else {
        setselectbox({ one: true })
      }
    } else if (itemindex === 1) {
      if(selectbox.two) {
        setselectbox({ two: null })
      } else {
        setselectbox({ two: true })
      }
    } else if(itemindex === 2) {
      if(selectbox.three) {
        setselectbox({ three: null })
      } else {
        setselectbox({ three: true })
      }
    } else if(itemindex === 3) {
      if(selectbox.four) {
        setselectbox({ four: null })
      } else {
        setselectbox({ four: true })
      }
    }
  }

  const handleSelectActive = (itemindex) => {
    if(itemindex === 0 && selectbox.one === true) {
      return 'active'
    } else if (itemindex === 1 && selectbox.two === true) {
      return 'active'
    } else if (itemindex === 2 && selectbox.three === true) {
      return 'active'
    } else if (itemindex === 3 && selectbox.four === true) {
      return 'active'
    }

    return ''
  }

  const handleOptionValue = (itemindex, value) => {
    // console.log('question index: ', itemindex, 'option chosen: ', value)
    console.log(optionvalue)
    if (itemindex === 0) {
      setoptionvalue(prevState => ({ ...prevState, one: value }))
    } else if (itemindex === 1) {
      setoptionvalue(prevState => ({ ...prevState, two: value }))
    } else if (itemindex === 2) {
      setoptionvalue(prevState => ({ ...prevState, three: value }))
    } else if (itemindex === 3) {
      setoptionvalue(prevState => ({ ...prevState, four: value }))
    }
  }

  const handleCheckOption = (itemindex) => {
    if (itemindex === 0 && optionvalue.one) {
      return optionvalue.one
    } else if (itemindex === 1 && optionvalue.two) {
      return optionvalue.two
    } else if(itemindex === 2 && optionvalue.three) {
      return optionvalue.three
    } else if(itemindex === 3 && optionvalue.four) {
      return optionvalue.four
    }

    return 'Select'
  }

  const handleOptionActive = (itemindex) => {
    if (itemindex === 0 && optionvalue.one) {
      return 'selected'
    } else if (itemindex === 1 && optionvalue.two) {
      return 'selected'
    } else if (itemindex === 2 && optionvalue.three) {
      return 'selected'
    } else if (itemindex === 3 && optionvalue.four) {
      return 'selected'
    }

    return ''
  }

  const handleOptionValueActive = (value) => {
    if(value === optionvalue.one) {
      return 'active'
    } else if (value === optionvalue.two) {
      return 'active'
    } else if (value === optionvalue.three) {
      return 'active'
    } else if (value === optionvalue.four) {
      return 'active'
    }

    return ''
  }


  const handleMoodSubmit = async () => {

    if(!optionvalue.one || !optionvalue.two || !optionvalue.three || !optionvalue.four) {
      setErrorstate('select all fields')
    } else {
      const now = Date.now();
      const moodLogItem = [
       
        { question: questions[0].question, answer: optionvalue.one },
        { question: questions[1].question, answer: optionvalue.two },
        { question: questions[2].question, answer: optionvalue.three },
        { question: questions[3].question, answer: optionvalue.four },
       
      ]

      console.log(moodLogItem)

      await submitMood(moodLogItem)
    }
  }

  useEffect(() => {
    if(!showModal) {
      setoptionvalue({
        one: null, two: null, three: null, four: null
      })
    }
  }, [showModal])


  

  // if (!showModal) return null;

  return (
    <div className={`mood-modal ${showModal ? 'active' : ''}`}>

      <div className="mood-modal-inner">

        
        <h2 className="inter mgb-20">Log Your Mood</h2>
        
        <div className="grid grid-column-1 gap-16">

          {questions ? questions.map((item, index) => (
            <div className="mood-qa-item" key={index}>
              <h3 className="inter mgb-10">{item.question}</h3>
                {item.question === 'How stressed do you feel right now?' || item.question === 'How focused or clear-minded are you today?' || item.question === 'How’s your energy level today?' ?
                    <CustomRangeSlider />
                  :
                    <div className={`mood-answer-box grid gap-4 grid-column-${(item.options.length)}`}>
                      {item.options.map(value => (
                        <div className={`mood-answer flex justify-center align-center cursor-pointer ${handleOptionValueActive(value)}`} key={value} onClick={() => handleOptionValue(index, value)}>
                          <h3 className="inter">{value}</h3>
                        </div>
                      ))}
                    </div>
                }
            </div>
          )) : null}

        </div>

        {/* <div className="position-relative"> */}
          {/* <form onSubmit={submit}> */}

              {/* {questions ? questions.map((item, index) => (
                <div className="ms-input-relative" key={index}>
                  <div className="ms-input-cont">
                    <p>{item.question}</p>
                    <div className={`mood-select-box cursor-pointer ${handleOptionActive(index)}`} key={index} onClick={() => handleSelectBox(index)} >
                        <h3>{handleCheckOption(index)}</h3>
                    </div>
                  </div>
                  <div className={`ms-down-box ${handleSelectActive(index)}`}>
                    {item.options.map(value => (
                      <h5 className="cursor-pointer" key={value}
                        onClick={() => {
                          handleOptionValue(index, value)
                          handleSelectBox(index)
                        }}
                      >
                        {value}
                      </h5>
                    ))}
                  </div>
                </div>
              )) : null} */}



            {errorstate ? <div className="status-messg lmd">
                <p >{errorstate}</p>
            </div> : null}

            <button className="auth-btn lmd-btn"
              onClick={handleMoodSubmit}
            >
                Submit
            </button>

          {/* </form> */}

        {/* </div> */}

      </div>

      
    </div>
  );
}

export default MoodLogModal;
