export async function checkAccount(
  address: string | undefined,
  BROKER_ID: string
): Promise<boolean> {
  if (!address) return false;
  const options = { method: "GET" };

  try {
    const response = await fetch(
      `https://testnet-api-evm.orderly.network/v1/get_account?address=${address}&broker_id=${BROKER_ID}`,
      options
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getRegistrationNonce(): Promise<string | null> {
  const options: RequestInit = { method: "GET" };
  try {
    const response = await fetch(
      "https://api-evm.orderly.network/v1/registration_nonce",
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = (await response.json()) as {
      data: { registration_nonce: string };
    };
    const registrationNonce = jsonResponse.data.registration_nonce;
    return registrationNonce;
  } catch (err) {
    console.error(err);
    return null; // or throw err to handle this error upstream
  }
}

// export async function registerAccount(
//   broker_id: string,
//   chain_id: number,
//   userAddress: string,
//   nonce: string,
//   signature: string
// ): Promise<boolean> {
//     const options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: '{"message":{"brokerId":"<string>","chainId":123,"timestamp":"<string>","registrationNonce":"<string>"},"signature":"<string>","userAddress":"<string>"}',
//     };

//     fetch("https://api-evm.orderly.network/v1/register_account", options)
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));

// }
