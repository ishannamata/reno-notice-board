import "../styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Notice Board | Reno Platforms</title>

        <meta
          name="description"
          content="Notice Board Management System"
        />

        <link rel="icon" href="/favicon.png?v=1" type="image/png" />
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Component {...pageProps} />
    </>
  );
}