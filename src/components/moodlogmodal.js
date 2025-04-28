// MoodLogModal.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import { useLogmood } from "../hooks/patch/useLogmood";
import CustomRangeSlider from "./rangeSlider";

import { closeModal } from "../redux/moodmodalSlice";

// utilities
import { icons } from "../utilities/icn";



function MoodLogModal({ questions }) {

  const showModal = useSelector((state) => state.showmodal.value)

  const { submitMood } = useLogmood()

  const dispatch = useDispatch()

  const [selectbox, setselectbox] = useState({
    one: null, two: null, three: null, four: null
  })
  const [optionvalue, setoptionvalue] = useState({
    one: null, two: null, three: null, four: null
  })
  const [sliderValue, setSliderValue] = useState(3)
  const [sliderValuetwo, setSliderValuetwo] = useState(3)
  const [sliderValuethree, setSliderValuethree] = useState(3)

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
    // console.log(optionvalue)
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

  const handleOptionValueActive = (value, itemindex) => {
    if(value === optionvalue.one && itemindex === 0) {
      return 'active'
    } else if (value === optionvalue.two && itemindex === 1) {
      return 'active'
    } else if (value === optionvalue.three && itemindex === 2) {
      return 'active'
    } else if (value === optionvalue.four && itemindex === 3) {
      return 'active'
    }

    return ''
  }

  const whichSlidervalue = (sliderquestion) => {
    if(sliderquestion === 'How stressed do you feel right now?') {
      return sliderValue
    }
    if(sliderquestion === 'How focused or clear-minded are you today?') {
      return sliderValuetwo
    }
    if(sliderquestion === 'How’s your energy level today?') {
      return sliderValuethree
    }
  }

  const getAnswer = (question, answervalue) => {
    if(question === 'How stressed do you feel right now?') {
      return sliderValue
    }
    if(question === 'How focused or clear-minded are you today?') {
      return sliderValuetwo
    }
    if(question === 'How’s your energy level today?') {
      return sliderValuethree
    }
    return answervalue
  }
  
  const handleSetslidervalue = (question, value) => {
    if(question === 'How stressed do you feel right now?') {
      setSliderValue(value)
    } else if(question === 'How focused or clear-minded are you today?') {
      setSliderValuetwo(value)
    } else if(question === 'How’s your energy level today?') {
      setSliderValuethree(value)
    }
  }

  const specialStrings = [
    "How’s your energy level today?",
    "How stressed do you feel right now?",
    "How focused or clear-minded are you today?",
  ];

  // Function to check if any filtered question matches a special string
  const hasSpecialQuestion = (filteredQuestions) => {
    return filteredQuestions.some((question) => specialStrings.includes(question));
  };
  // Function to check if a single question matches any special string
  const isSpecialQuestion = (question) => {
    return specialStrings.includes(question);
  };


  const handleMoodSubmit = async () => {
    setErrorstate(null)

    if(((!optionvalue.one && isSpecialQuestion(questions[0].question) === false) || (!optionvalue.two && isSpecialQuestion(questions[1].question) === false) 
        || (!optionvalue.three && isSpecialQuestion(questions[2].question) === false) || (!optionvalue.four && isSpecialQuestion(questions[3].question) === false))) {
      setErrorstate('select all fields')
    } else {
      const now = Date.now();
      const moodLogItem = [
       
        // { question: questions[0].question, answer: optionvalue.one },
        // { question: questions[1].question, answer: optionvalue.two },
        // { question: questions[2].question, answer: optionvalue.three },
        // { question: questions[3].question, answer: optionvalue.four },

        { question: questions[0].question, answer: getAnswer(questions[0].question, optionvalue.one) },
        { question: questions[1].question, answer: getAnswer(questions[1].question, optionvalue.two) },
        { question: questions[2].question, answer: getAnswer(questions[2].question, optionvalue.three) },
        { question: questions[3].question, answer: getAnswer(questions[3].question, optionvalue.four) },
       
      ]

      // console.log(moodLogItem)

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
  
  const setAlltoNull = () => {
    setoptionvalue({
      one: null, two: null, three: null, four: null
    })
    dispatch(closeModal())
  }

  return (
    <div className={`mood-modal ${showModal ? 'active' : ''}`}>

      <div className="mood-modal-inner">

        
        <div className="flex align-center justify-space-between">
          <h2 className="inter mgb-20">Log Your Mood</h2>
          <div className="modals-close-icon flex justify-center align-center cursor-pointer" onClick={setAlltoNull}>
            <img src={icons.header.close} alt="" />
          </div>
        </div>
        
        <div className="grid grid-column-1 gap-16 mgb-24">

          {questions ? questions.map((item, index) => (
            <div className="mood-qa-item" key={index}>
              <h3 className="inter mgb-10">{item.question}</h3>
                {item.question === 'How stressed do you feel right now?' || item.question === 'How focused or clear-minded are you today?' || item.question === 'How’s your energy level today?' ?
                    <CustomRangeSlider value={whichSlidervalue(item.question)} setValue={(newValue) => handleSetslidervalue(item.question, newValue)} />
                  :
                    <div className={`mood-answer-box grid gap-4 `}>
                      {item.options.map(value => (
                        <div className={`mood-answer flex justify-center align-center cursor-pointer ${handleOptionValueActive(value, index)}`} key={value} onClick={() => handleOptionValue(index, value)}>
                          <h3 className="inter">{value}</h3>
                        </div>
                      ))}
                    </div>
                }
            </div>
          )) : null}

        </div>

        {errorstate ? <div className="status-messg lmd mgb-24">
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
