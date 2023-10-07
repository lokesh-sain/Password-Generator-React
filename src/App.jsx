import { useState, useEffect, useCallback, useRef } from "react"
import FileSaver from 'file-saver';



function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [numbersAllowed, setNumberAllowed] = useState(false);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyIcon, setCopyIcon] = useState("regular");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    //Here UseCallback Used For Optimization.. You can run this function without useCallback
    let pass = "";
    let upperStr = "ABCEDEFGHIJKLMNOPQRSTUVWXYZ";
    let numStr = "0123456789";
    let symbolStr = "!@#$%^&*()-+~?";
    let defaultStr = "abcdefghijklmnopqrstuvwxyz"

    if (uppercaseAllowed) defaultStr += upperStr;
    if (numbersAllowed) defaultStr += numStr;
    if (symbolsAllowed) defaultStr += symbolStr;

    for (let i = 0; i < passwordLength; i++) {
      let char = Math.floor(Math.random() * defaultStr.length)
      pass += defaultStr.charAt(char);
    }
    setPassword(pass);
    setCopyIcon("regular")
  }, [passwordLength, numbersAllowed, uppercaseAllowed, symbolsAllowed, setPassword])

  const copyToClipBoard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    setCopyIcon("solid")
  }

  const savePassword = () => {
    const savePass = new Blob([password], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(savePass, 'password.txt');

  }

  //useEffect will call the funtion when DOM is loading

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength])

  return (
    <div className="w-full h-screen bgColor duration-200 ">
      <div className="flex justify-center">
        <div className="bg-white mt-20 w-80 md:w-1/3 rounded-lg shadow-xl">
          <div className=" border-b-2 text-lg font-medium py-3 px-5">
            <h1>Password Generator</h1>
          </div>
          <div className="mainWrapper py-4 px-5 relative">
            <div className="inputBox flex justify-start ">
              <input ref={passwordRef} type="text" defaultValue={password} className="block w-full pr-12 p-2 text-gray-900 border border-gray-300 text-xl rounded-lg outline-none font-medium" />
              <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" className=" py-auto top-5 pt-1 px-1 absolute right-8 text-gray-400 font-semibold text-xl rounded-lg hover:text-gray-700" onClick={copyToClipBoard}><i className={`fa-${copyIcon} fa-copy`}></i></button>

            </div>
            <div className="passwordLength">
              <div className="flex justify-between">
                <h4 className="text-md font-medium pt-3 pb-1">Password Length</h4>
                <h4 className="text-md font-medium pt-3 pb-1">{passwordLength}</h4>
              </div>
              <input type="range" id="length" min={8} defaultValue={passwordLength} max={24} onChange={(e) => setPasswordLength(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer " />
            </div>
            <div className="password-settings">
              <h4 className="text-md font-medium py-3">Password Settings</h4>

              <div className="flex flex-wrap justify-between">
                <div className="w-1/2 flex">
                  <input type="checkbox" id="lowercase" className="self-center" defaultChecked={true} disabled={true} />
                  <label htmlFor="lowercase" className="px-2 text-md text-gray-500">Lowercase (a-z)</label>
                </div>

                <div className="w-1/2">
                  <input type="checkbox" id="uppercase" className="self-center cursor-pointer" onChange={() => setUppercaseAllowed((prevResult) => !prevResult)} />
                  <label htmlFor="uppercase" className="px-2 text-md cursor-pointer text-gray-500">Uppercase (A-Z)</label>
                </div>

                <div className="w-1/2">
                  <input type="checkbox" id="numbers" className="self-center cursor-pointer" onChange={() => setNumberAllowed((prevResult) => !prevResult)} />
                  <label htmlFor="numbers" className="px-2 text-md text-gray-500 cursor-pointer">Numbers (0-9)</label>
                </div>
                <div className="w-1/2">
                  <input type="checkbox" id="symbols" className="self-center cursor-pointer" onChange={() => setSymbolsAllowed((prevResult) => !prevResult)} />
                  <label htmlFor="symbols" className="px-2 text-md text-gray-500 cursor-pointer">Symbols (!$@#&)</label>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-center rounded py-3 mt-5 mb-2 text-white uppercase hover:bg-blue-700" onClick={passwordGenerator}>Generate Password</button>
            <button className="w-full bg-neutral-200 border  rounded text-center py-3 mb-5 text-gray-700  hover:bg-neutral-300" onClick={savePassword}><i className="fa-solid fa-download"></i> Save Password</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
