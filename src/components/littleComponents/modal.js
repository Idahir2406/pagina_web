import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ReportLabel from "./reportLabel";

export const Modal = ({ isOpen, setIsOpen }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [report, setReport] = useState("")

  const handleReportChange = (event) => {
    setReport(event.target.value);
    console.log(report)
  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReport = async() => {
    if(selectedOption === "report4"){
      const res = await fetch(`http://localhost:3000/api/report/${selectedOption}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: report
      })
      const data = await res.json()
      console.log(data)
    }
    const res = await fetch(`http://localhost:3000/api/report/${selectedOption}`)
    const data = await res.json()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded-md bg-white p-5">
          <Dialog.Title className="flex items-center justify-between text-xl mb-3">
            Reportar un problema
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                class="h-6 w-6 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
          </Dialog.Title>
          <Dialog.Description>
            Selecciona el motivo por el cual quieres reportar esta tarea
          </Dialog.Description>

          <div className="flex flex-col gap-3 mt-3">
            <ReportLabel
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              value="report1"
              label="La respuesta no tiene las condiciones solicitadas"
            />
            <ReportLabel
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              value="report2"
              label="El archivo .pdf está corrupto y no puede ser ejecutado"
            />
            <ReportLabel
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              value="report3"
              label="La respuesta no coincide con lo solicitado"
            />
            <ReportLabel
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              value="report4"
              label="Otra razón"
            />
            {selectedOption === "report4" && (
              <textarea onChange={handleReportChange} className="border outline-none rounded-md focus:border-violet-500 focus:border-2 p-2" />
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="border rounded-md py-1 px-2 hover:bg-gray-100 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-violet-500 rounded-md py-1 px-2 hover:bg-violet-600 transition-all text-white"
              onClick={handleReport}
            >
              Reportar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
