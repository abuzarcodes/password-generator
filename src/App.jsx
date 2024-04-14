import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [lenght, setlenght] = useState("6");
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("password");
  const passwordref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let characters = "!@#$%^&*()+{}>?<";
    if (numberallowed) {
      str += numbers;
    }
    if (charallowed) {
      str += characters;
    }
    for (let i = 1; i <= lenght; i++) {
      const randomchar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomchar);
    }
    setpassword(pass);
  }, [lenght, numberallowed, charallowed, setpassword]);

  const copypassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  });
  useEffect(() => {
    passwordgenerator();
  }, [lenght, numberallowed, charallowed, passwordgenerator]);
  return (
    <>
      <div className="body w-full h-screen bg-black p-8 text-orange-500">
        <div className="app flex justify-center bg-gray-800 m-auto w-3/5 p-4 rounded-lg flex-wrap items-center gap-1">
          <div className="head w-full text-center font-extrabold text-5xl block">
            PASSWORD GENERATOR
          </div>
          <input
            type="text"
            className="w-3/4 float-left rounded-lg p-1 font-bold"
            value={password}
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copypassword()}
            className="copy bg-gray-500 rounded-lg p-2 hover:bg-slate-600 font-bold"
          >
            copy
          </button>
          <input
            type="range"
            className="transparent h-[4px] w-1/2 float-left m-4 cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
            min="5"
            max="100"
            id="customRange2"
            value={lenght}
            name="length"
            onChange={(e) => {
              setlenght(e.target.value);
            }}
          />
          <label htmlFor="length">lenth: {lenght}</label>
          <input
            type="checkbox"
            className="numberAllowed"
            name="numberAllowed"
            onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberAllowed">Numbers</label>
          <input
            type="checkbox"
            className="charAllowed"
            name="charAllowed"
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
          />
          <label htmlFor="charAllowed">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
