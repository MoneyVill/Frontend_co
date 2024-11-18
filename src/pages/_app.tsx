import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai"
// import { mainStore } from "@/store/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider>
        <Component {...pageProps} />
      </Provider>
  )
}
