import React from 'react'
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
const client = createThirdwebClient({ clientId: "ebdc164abd90c6a4100b909d5addbcad" });

const MyConnectButton = () => {
  return (
    <div>
        <ConnectButton client={client} />;
    </div>
  );
}

export default MyConnectButton