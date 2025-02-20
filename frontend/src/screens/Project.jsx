import React, { useState } from 'react';

export const Project = () => {

  let [isSlidePanelOpen, setSlidePanelOpen] = useState(false);
  return (
    <main className="h-screen w-screen flex">
      <section className=" relative left h-full min-w-72 bg-gray-400 flex flex-col">

        <header className="flex justify-end p-4 w-full bg-gray-300">
          <button
            onClick={() => setSlidePanelOpen(!isSlidePanelOpen)} 
            className="p-2 px-4">
              <i class="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">

          <div className="message-box flex-grow overflow-auto p-1 flex-col max-w-96 min-w-96 ">

                <div className="incoming message flex flex-col bg-slate-300 rounded-md w-fit p-2">
                    <small className='opacity-40 text-indigo-950 text-sm'>test@gmail.com</small>
                    <p className='text-sm font-bold'>Hello there all good.</p>  
                </div>


                <div className="ml-auto flex flex-col bg-slate-300 rounded-md w-fit p-2 mt-1 max-w-80">
                    <small className='opacity-40 text-indigo-950 text-sm'>test@gmail.com</small>
                    <p className='text-sm font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eligendi vitae quos voluptates quibusdam temporibus molestiae placeat eaque, nam rerum.</p>  
                </div>
          </div>


            <br />
          <div className="inputField flex justify-between w-full bg-gray-200">
            <input
              type="text"
              placeholder="Enter message"
              className="border-none outline-none w-full p-2"
            />
            <button className="border border-green-400 p-2 bg-sky-300">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div className={`sidePanel h-full w-full bg-red-700 absolute top-0  transition-all ${isSlidePanelOpen ? 'translate-x-0' : "-translate-x-full"} `}>
          <header className='flex justify-end p-4 w-full bg-gray-300' >
          <button
            onClick={() => setSlidePanelOpen(!isSlidePanelOpen)} 
            className="p-2 px-4 text-2xl">
              <i class="ri-close-fill"></i>
          </button>
          </header>
        </div>
      </section>
    </main>
  );
};
