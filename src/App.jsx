import { useState, useEffect, useRef } from "react";
import Map from "./components/Map";
import useMap from "./hooks/useMap";

function App() {
  // const array = ["United Arab Emirates", "Afghanistan" ,"Albania" ,'Armenia','Angola','Argentina']
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryList, setCountryList] = useState([])
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)

  const first = useRef(null)
  const second = useRef(null)
  const third = useRef(null)
  const fourth = useRef(null)


  const nextBtn = useRef(null)

 

useEffect(() => {
  setHighScore(localStorage.getItem("savedHighScore"));
  if(count>10){
    if(score>highScore){
      setHighScore(score);
      localStorage.setItem("savedHighScore",score);
    }
    alert(`Game Over! You Scored ${score} out of 10`)
    setCount(0);
    setScore(0);
    setSelectedCountry(null);
  }
}, [count])



  function chooseCountry(){
    setCount(count+1);
    first.current.disabled = false;
    second.current.disabled = false;
    third.current.disabled = false;
    fourth.current.disabled = false;
    nextBtn.current.classList.add("invisible")

    first.current.classList.remove("bg-green-500")
    second.current.classList.remove("bg-green-500")
    third.current.classList.remove("bg-green-500")
    fourth.current.classList.remove("bg-green-500")
    first.current.classList.remove("bg-red-500")
    second.current.classList.remove("bg-red-500")
    third.current.classList.remove("bg-red-500")
    fourth.current.classList.remove("bg-red-500")

    const countires = useMap();
    let randomCountry = countires[Math.floor(Math.random() * 4)];
    setSelectedCountry(randomCountry);
    setCountryList(countires);
    
  }

  function checkAnswer(guessed){
    first.current.disabled = true;
    second.current.disabled = true;
    third.current.disabled = true;
    fourth.current.disabled = true;
    nextBtn.current.classList.remove("invisible")
    if(selectedCountry==guessed){
      setScore(score+1);
      if(first.current.innerText==guessed){
        first.current.classList.add("bg-green-500")
      }
      else if(second.current.innerText==guessed){
        second.current.classList.add("bg-green-500")
      }
      else if(third.current.innerText==guessed){
        third.current.classList.add("bg-green-500")
      }
      else if(fourth.current.innerText==guessed){
        fourth.current.classList.add("bg-green-500")
      }
      
    }
    else{
      if(first.current.innerText==selectedCountry){
        first.current.classList.add("bg-green-500")
      }
      else if(second.current.innerText==selectedCountry){
        second.current.classList.add("bg-green-500")
      }
      else if(third.current.innerText==selectedCountry){
        third.current.classList.add("bg-green-500")
      }
      else if(fourth.current.innerText==selectedCountry){
        fourth.current.classList.add("bg-green-500")
      }

      if(first.current.innerText==guessed){
        first.current.classList.add("bg-red-500")
      }
      else if(second.current.innerText==guessed){
        second.current.classList.add("bg-red-500")
      }
      else if(third.current.innerText==guessed){
        third.current.classList.add("bg-red-500")
      }
      else if(fourth.current.innerText==guessed){
        fourth.current.classList.add("bg-red-500")
      }
    }
   
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col-reverse md:flex-row">
        <div
          className=" w-full md:w-1/4 md:h-screen h-1/2 bg-gray-100 drop-shadow-xl  flex items-center justify-center border-r-2 border-gray-400 flex-col md:pt-10"
          id="left-panel"
        >
          <div className={`flex flex-col items-center  ${selectedCountry && "hidden"} ${selectedCountry && "md:flex"} absolute top-10 text-gray-500`}>
            <h1 className=" text-4xl font-bold">Guess The Country</h1>
            <h3>By looking at the map!</h3>
          </div>
         

          <div className={selectedCountry && "hidden"}>
            <button className="py-2 px-10 bg-blue-500 text-2xl mt-20 md:mt-0 font-semibold rounded-xl text-white" onClick={chooseCountry}>Start Game</button>
          </div>
          <div className={`flex ${!selectedCountry && "hidden"} flex-col items-center gap-4 p-7`}>
            <h2 className=" text-4xl  md:text-8xl font-bold text-gray-400">{count}</h2>
            <h1 className="md:mb-5  text-sm md:text-2xl font-semibold md:font-bold text-gray-700 text-center">What is the name of highlighted country?</h1>
            <div className="flex flex-col  gap-2 md:gap-3">
                <button className="md:w-48 w-40 text-xs md:text-base border-2 text-gray-700 border-gray-500 font-semibold py-1 px-1 rounded-lg" onClick={()=>checkAnswer(countryList[0])} ref={first} >{countryList[0]}</button>
                <button className="md:w-48 w-40 text-xs md:text-base border-2 text-gray-700 border-gray-500 font-semibold py-1 px-1 rounded-lg" onClick={()=>checkAnswer(countryList[1])}  ref={second}>{countryList[1]}</button>
                <button className="md:w-48 w-40 text-xs md:text-base border-2 text-gray-700 border-gray-500 font-semibold py-1 px-1 rounded-lg" onClick={()=>checkAnswer(countryList[2])}  ref={third}>{countryList[2]}</button>
                <button className="md:w-48 w-40 text-xs md:text-base border-2 text-gray-700 border-gray-500 font-semibold py-1 px-1 rounded-lg" onClick={()=>checkAnswer(countryList[3])}  ref={fourth}>{countryList[3]}</button>
            </div>
            <button onClick={chooseCountry} ref={nextBtn} className="py-1 px-8 w-40 md:w-48 md:px-10 bg-blue-500 text-xl md:text-2xl font-semibold rounded-xl text-white mt-4 md:mt-10">Next</button>
          </div>  
          <div className={`bg-blue-400 w-full  ${!selectedCountry && "md:hidden"}  md:h-16 md:absolute md:bottom-0 hidden md:flex gap-36 items-center p-6`}>
              <h1 className="text-white font-semibold  text-sm md:text-xl">Current Score: {score}</h1>
              <h1 className="text-white font-semibold  text-sm md:text-xl">High Score: {highScore}</h1>
          </div>
        </div>
        <div
          className=" w-full md:w-3/4  h-1/2 md:h-screen flex justify-center items-center p-10"
          id="right-panel"
        >
           <div className={`bg-blue-500 w-full  ${!selectedCountry && "hidden"}  h-12 md:h-16 absolute top-0 flex md:hidden gap-36 items-center p-6`}>
              <h1 className="text-white font-semibold  text-sm md:text-xl">Current Score: {score}</h1>
              <h1 className="text-white font-semibold  text-sm md:text-xl">High Score: {highScore}</h1>
          </div>

          <Map
            country={selectedCountry}
            newClr="text-blue-500"
            oldClr="text-gray-500"
          />
        </div>
      </div>
    </>
  );
}

export default App;
