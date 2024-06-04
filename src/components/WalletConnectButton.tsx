import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletConnectButtonProps {
    // Define prop types here
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = () => {

    // const { isConnected, address, chain } = useAccount();
    // const { status } = useSession();
    // const { signMessageAsync } = useSignMessage();
    // const { push } = useRouter();
    // const { requestChallengeAsync } = useAuthRequestChallengeEvm();

    // useEffect(() => {
    //     const handleAuth = async () => {
    //         const { message } = await requestChallengeAsync({
    //             address: address,
    //             chainId: chain.id,
    //         });

    //         const signature = await signMessageAsync({ message });

    //         // redirect user after success authentication to '/user' page
    //         const { url } = await signIn("moralis-auth", {
    //             message,
    //             signature,
    //             redirect: false,
    //             callbackUrl: "/user",
    //         });
    //         /**
    //          * instead of using signIn(..., redirect: "/user")
    //          * we get the url from callback and push it to the router to avoid page refreshing
    //          */
    //         push(url);
    //     };
    //     if (status === "unauthenticated" && isConnected) {
    //         handleAuth();
    //     }
    // }, [status, isConnected]);

    return (
        <div className='block pt-4'>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');
                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button onClick={openConnectModal} type="button" className='bg-white border-2 border-black text-black rounded-lg px-8 py-1.5 font-bold shadow-xl  shadow-black/30 hover:bg-gray-700 w'>
                                            Connect
                                        </button>
                                    );
                                }
                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} type="button" className='bg-red-500 border-2 border-black text-black rounded-full px-3 py-1 shadow-xl transform transition duration-300 ease-in-out shadow-black/30 hover:-translate-y-1 hover:bg-red-300'>
                                            Wrong network
                                        </button>
                                    );
                                }
                                return (
                                    <div style={{ backgroundColor: '#1e1e1e', fontFamily: 'Sk-Modernist-Bold', padding: '10px', borderRadius: '8px', display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={openChainModal}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            type="button"
                                            className='border-2 border-black rounded-full'
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 999,
                                                        overflow: 'hidden',
                                                        marginRight: 0,
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{ width: 24, height: 24}}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {/* {chain.name} */}
                                        </button>
                                        <button title='Click to view address' onClick={openAccountModal} type="button" className='text-white rounded-md shadow-xl  shadow-black/20 hover:bg-gray-800'>
                                            {account.displayName}
                                            {/* {account.displayBalance
                                                ? ` ${account.displayBalance}`
                                                : ''} */}
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
};

export default WalletConnectButton;