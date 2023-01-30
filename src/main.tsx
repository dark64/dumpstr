import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { NostrProvider } from "nostr-react";
import App from "./App";
import theme from "./theme";

const relayUrls = [
  "wss://nostr-pub.wellorder.net", 
  "wss://relay.snort.social",
  "wss://relay.nostr.ch",
  "wss://nos.lol"
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <NostrProvider relayUrls={relayUrls} debug={true}>
        <App />
      </NostrProvider>
    </ChakraProvider>
  </React.StrictMode>
);
