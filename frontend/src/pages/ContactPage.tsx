import { SendHorizonal, Code, Lock, AlertCircle, Loader2, BadgeCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";



interface ConnectChannelInterface {
  icon: React.ReactNode;
  name: string;
  url: string;
}
const CONNECT_CHANNELS: ConnectChannelInterface[] = [
  {
    icon: <Lock />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dothp/",
  }, {
    icon: <SendHorizonal />,
    name: "Email",
    url: "mailto:dothp.connect@outlook.com",
  },
  {
    icon: <Code />,
    name: "Github",
    url: "https://github.com/dothp-harshu",
  }
]

function ContactPage() {
  const [error, seterror] = useState<string>("")
  const [sending, setSending] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    setSending(true)
    seterror("")
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formdata = new FormData(form)

    const name = formdata.get("name")?.toString().trim()
    const email = formdata.get("email")?.toString().trim()
    const message = formdata.get("message")?.toString().trim()

    if (!name && !email && !message) {
      setSending(false)
      return seterror("Fill every *(required) field.")
    }
    formdata.append("access_key", import.meta.env.VITE_WEB_3_FORM_TOKEN)
    try {

      const res = await axios.post("https://api.web3forms.com/submit", formdata)
      if (res.status === 200) {
        setSubmitted(true)
        setSending(false)
      } else {
        setSending(false)
        return seterror("Something went wrong. Please try again later.")
      }


    } catch (error) {
      setSending(false)
      const err = error as Error
      return seterror(err.message || "Something went wrong.")

    }
    setSending(false)
  }
  if(submitted){
    return <div className="w-screen h-screen bg-bg-light dark:bg-bg-dark flex justify-center items-center p-6 text-text-light dark:text-text-dark ">
      <div className="max-w-sm w-full h-fit bg-surface-primary-light dark:bg-surface-primary-dark p-6 rounded-2xl flex justify-center items-center flex-col gap-6 border-2 border-border-light dark:border-border-dark">
        <div className="bg-green-400/10 p-4 w-fit h-fit rounded-full border-2 border-green-400/50">
          <BadgeCheck size={40} className="text-green-500"/>
        </div>
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-bold">Feedback received</h2>
          <p className="text-center text-base font-light leading-none text-text-muted-light dark:text-text-muted-dark">Thanks for the feedback. It helps identify what’s working and what can be improved.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <button onClick={()=>navigate("/")} className="w-fit px-4 py-1 bg-green-500/50 rounded-lg outline-none hover:bg-green-400/80 transition-colors duration-300 cursor-pointer select-none">
            Goto Home
          </button>
          <button onClick={()=>navigate("/generator")} className="w-fit px-4 py-1 bg-primary rounded-lg outline-none hover:bg-primary-hover transition-colors duration-300 cursor-pointer select-none">
            Generate Readme
          </button>
        </div>
      </div>
    </div>
  }
  
  return (
    <main className="text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark min-h-screen">
      <Header />
      {/* page header  */}
      <section className="max-w-5xl w-full mx-auto pt-20 px-6">
        <div className="">
          <h2 className="text-4xl font-bold text-center">
            Contact <span className="text-primary">&</span> Feedback
          </h2>
          <p className="text-center md:text-xl text-lg mt-6 text-text-muted-light dark:text-text-muted-dark font-light uppercase">
            Send feedback, ask questions, or report problems.
          </p>
        </div>

        {/* Thanks message  */}
        <div className=" w-fit mx-auto flex justify-center items-center flex-col gap-2 mt-10 pt-2 pb-4 px-4 border-2 border-border-light dark:border-border-dark rounded-xl bg-surface-primary-light dark:bg-surface-primary-dark">
          <div className="w-10 h-10 text-primary ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-center md:text-base text-sm text-text-muted-light dark:text-text-muted-dark font-light">
            Thanks for reaching out. Your input is invaluable to us.
          </p>
        </div>
        {/* Thanks message  */}
      </section>
      {/* page header  */}

      {/* Feadback form  */}
      <section className="max-w-5xl w-full mx-auto px-6 mt-10">
        <form className="max-w-xl w-full mx-auto py-6 space-y-6" onSubmit={((e) => handleSubmit(e))}>
          <input type="hidden" name="subject" value="New Feedback from readmeDotHP" />
          <input type="hidden" name="from_name" value="readmeDotHP Contact Form" />

          <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
            <div>
              <label
                className="block mb-1 text-sm font-semibold"
                htmlFor="name"
              >
                Name *
              </label>
              <input
                placeholder="Your name"
                type="text"
                id="name"
                name="name"
                className=" bg-surface-primary-light dark:bg-surface-primary-dark border-2 border-border-light dark:border-border-dark focus:border-primary/50 outline-none px-4 py-2 w-full rounded-lg"
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-semibold"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                placeholder="Your email"
                type="email"
                id="email"
                name="email"
                className="bg-surface-primary-light dark:bg-surface-primary-dark border-2 border-border-light dark:border-border-dark focus:border-primary/50 outline-none px-4 py-2 w-full rounded-lg"
              />
            </div>
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="message"
            >
              Message *
            </label>
            <textarea
              placeholder="Your message"
              id="message"
              name="message"
              className="bg-surface-primary-light dark:bg-surface-primary-dark border-2 border-border-light dark:border-border-dark focus:border-primary/50 outline-none px-4 py-2 w-full rounded-lg resize-none"
              rows={5}
            />
          </div>
          {
            error !== "" && (
              <div className="w-full flex justify-start items-center gap-2">
                <AlertCircle className="text-red-400/50" size={16} />
                <p className="text-red-500/50 text-sm">{error}</p>
              </div>
            )
          }
          <div className="w-full flex justify-center items-center">
            <button disabled={sending} className="bg-primary flex justify-center select-none items-center gap-2 px-4 py-2 outline-none rounded-lg cursor-pointer text-text-dark  hover:bg-primary-hover transition-colors duration-200">
              <span className="text-base font-semibold tracking-normal">
                Send Feedback
              </span>
              {
                sending ? (
                  <span>
                    <Loader2 className="animate-spin" strokeWidth={1.25} size={16} />
                  </span>
                ) : (<span>
                  <SendHorizonal strokeWidth={1.25} size={16} />
                </span>)
              }
            </button>
          </div>
        </form>
      </section>
      {/* Feadback form  */}

      {/* Contact  */}
      <section className="max-w-5xl w-full mx-auto mt-10 px-6">
        <div className="divider w-full h-0.5 bg-border-light dark:bg-border-dark">
        </div>
        <div className="py-10 space-y-2">
          <h2 className="text-2xl font-bold text-center">Connect directly</h2>
          <p className="text-sm font-normal text-text-muted-light dark:text-text-muted-dark text-center">Reach out if you’d like to share feedback or report an issue.</p>
          <div className="grid grid-cols-3 max-xs:grid-cols-1 max-w-sm mx-auto mt-10">
            {CONNECT_CHANNELS.map((channel, index) => (
              <a
                key={index}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="place-self-center space-y-4 flex flex-col items-center justify-center group"
              >
                <span className="bg-surface-secondary-light dark:bg-surface-secondary-dark border-2 border-border-light dark:border-border-dark outline-none p-4 w-fit rounded-lg flex justify-center items-center group-hover:text-primary group-hover:border-primary transition-colors duration-300">

                  {channel.icon}
                </span>
                <span className="text-base font-semibold tracking-normal text-text-muted-light dark:text-text-muted-dark uppercase">
                  {channel.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Contact  */}

      <Footer />
    </main>
  );
}

export default ContactPage;
