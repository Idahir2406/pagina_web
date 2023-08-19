import { useState, useEffect, useRef } from "react";

import { BsChatDots } from "react-icons/bs";
import { useChat } from "ai/react";
import { useUser } from "hooks/useUser";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Chat() {
  const { user, Loading } = useUser();

  const [message, setMessage] = useState({});
  const [chat, setChat] = useState([]);
  const [loadChat, setLoadChat] = useState(false);
  const chatContainerRef = useRef(null);

  const { handleInputChange, handleSubmit, messages, input, isLoading } =
    useChat({
      onFinish: (response) => {
        sendMessage({
          role: "assistant",
          content: response.content,
        });
        setLoadChat(false);
      },
    });

  const getChats = async () => {
    scrollToBottom();

    try {
      const res = await fetch(
        `http://localhost:3000/api/Chat/insertChats?email=${user.email}`
      );
      const data = await res.json();

      setChat(data);
    } catch (error) {
      console.log(error);
    }

    return;
  };

  useEffect(() => {
    scrollToBottom();
    if (!Loading) {
      getChats();
    }
  }, [Loading, loadChat]);

  const scrollToBottom = () => {
    const moveToBottom = setInterval(() => {
      const contenedor = chatContainerRef.current;
      if (contenedor !== null) {
        contenedor.scrollTop = contenedor.scrollHeight;
      }
      return clearInterval(moveToBottom);
    }, 50);
  };
  function closeModal() {
    scrollToBottom();
    setIsOpen(false);
  }
  function openModal() {
    scrollToBottom();
    setIsOpen(true);
  }
  const handleChange = (e) => {
    handleInputChange(e);
    setMessage({
      role: "user",
      content: e.target.value,
    });
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      await sendMessage(message);
      handleSubmit(e);
    }
    return;
  };

  const sendMessage = async (message) => {
    await fetch("http://localhost:3000/api/Chat/insertChats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: message,
        email: user.email,
      }),
    });
  };

  const handleDelete = async () => {
    await fetch(
      `http://localhost:3000/api/Chat/insertChats?email=${user.email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoadChat(!loadChat);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="p-4 rounded-full bg-black fixed bottom-0 right-0 mr-5 mb-5"
        isIconOnly
        onPress={onOpen}
      >
        <BsChatDots className="text-white" />
      </Button>
      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader

                as="h3"
                className="text-lg font-medium leading-6 dark:text-gray-200 text-gray-900 flex items-center justify-between"
              >
                ChatBot
                <button
                  onClick={handleDelete}
                  className="hover:bg-gray-200 rounded-full transition-colors dark:hover:bg-gray-600"
                >
                  <AiOutlineDelete className="" />
                </button>
              </ModalHeader>
              <ModalBody>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Habla con nuestro asistente inteligente para resolver
                    cualquier duda que tengas.
                  </p>
                </div>

                <div className="mt-4 ">
                  <div
                    ref={chatContainerRef}
                    className="ring-2 ring-violet-400 w-full rounded-lg p-4 flex flex-col gap-2 max-h-96 overflow-auto"
                  >
                    {chat.map((message, index) =>
                      message.role === "assistant" ? (
                        <div key={index} className="flex justify-start">
                          <div className=" bg-violet-600 rounded-md text-start px-2 py-4 max-w-md text-white">
                            {message.content}
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="flex justify-end">
                          <span className="bg-violet-600 rounded-md px-2 py-4 max-w-md text-white ">
                            {message.content}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <textarea
                  placeholder="Escribe tu pregunta aquí..."
                  onChange={handleChange}
                  className="bg-gray-200 dark:bg-slate-800  dark:text-white w-[75%] outline-none border border-violet-600 rounded-md p-2 focus:ring-violet-400 focus:ring-2 transition resize-none text-black"
                  value={input}
                />
                <div className="flex flex-col gap-2">
                  <Button color="primary" onPress={handleSubmitMessage}>
                    Enviar
                  </Button>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Button className="p-4 rounded-full bg-black fixed bottom-0 right-0 mr-5 mb-5" isIconOnly onPress={onOpen}>
        <BsChatDots className="text-white" />
    </Button>

      <Modal open={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ChatBot</ModalHeader>
              <ModalBody>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Habla con nuestro asistente inteligente para resolver
                    cualquier duda que tengas.
                  </p>
                </div>

                <div className="mt-4 ">
                  <div
                    ref={chatContainerRef}
                    className="ring-2 ring-violet-400 w-full rounded-lg p-4 flex flex-col gap-2 max-h-96 overflow-auto"
                  >
                    {chat.map((message, index) =>
                      message.role === "assistant" ? (
                        <div key={index} className="flex justify-start">
                          <div className=" bg-violet-600 rounded-md text-start px-2 py-4 max-w-md text-white">
                            {message.content}
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="flex justify-end">
                          <span className="bg-violet-600 rounded-md px-2 py-4 max-w-md text-white ">
                            {message.content}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <form
                    onSubmit={handleSubmitMessage}
                    className="w-full mt-2 flex gap-2"
                  >
                    <textarea
                      placeholder="Escribe tu pregunta aquí..."
                      onChange={handleChange}
                      className="bg-slate-800 dark:text-white w-[75%] outline-none  border border-violet-600 rounded-md p-2 focus:ring-violet-400 focus:ring-2 transition resize-none text-black"
                      value={input}
                    />
                    <button
                      type="submit"
                      className="w-[24%] bg-violet-600 py-3 rounded-lg text-white hover:bg-violet-700"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800 ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 dark:text-gray-200 text-gray-900 flex items-center justify-between"
                  >
                    ChatBot
                    <button
                      onClick={handleDelete}
                      className="p-4 hover:bg-gray-200 rounded-full transition-colors dark:hover:bg-gray-600"
                    >
                      <AiOutlineDelete className="" />
                    </button>
                  </Dialog.Title>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
}
