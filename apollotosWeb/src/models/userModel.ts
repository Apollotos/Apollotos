import { useState, useCallback, SetStateAction } from 'react';

const coverFalseString = (str: string | null) => {
  if (!str) return false;
  if (str === 'false') {
    return false;
  } else {
    return true;
  }
}

const setLocal = (key: string, val: string) => {
  localStorage.setItem(key, val)
}

export default () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [showEmail, setShowEmail] = useState(coverFalseString(localStorage.getItem('showEmail')) || false);
  const [link, setLink] = useState(localStorage.getItem('link') || '');
  const [showLink, setShowLink] = useState(coverFalseString(localStorage.getItem('showLink')) || false);
  const [twitter, setTwitter] = useState(localStorage.getItem('twitter') || '');
  const [showTwitter, setShowTwitter] = useState(coverFalseString(localStorage.getItem('showTwitter')) || false);
  const [walletPublicAddress, setWalletPublicAd] = useState(localStorage.getItem('walletPublicAddress') || '');
  const [chains, setC] = useState(localStorage.getItem('chains') || '');
  const [isGuide, setisGuide] = useState(coverFalseString(localStorage.getItem('isGuide')) || false);

  const setEmailAddress = useCallback((email: SetStateAction<string>) => { setEmail(email); setLocal('email', email as string) }, []);
  const switchEmail = useCallback((status: boolean | ((prevState: boolean) => boolean)) => { setShowEmail(status); setLocal('showEmail', status as unknown as string) }, []);
  const setLinkAddress = useCallback((link: SetStateAction<string>) => { setLink(link); setLocal('link', link as string) }, []);
  const switchLink = useCallback((status: boolean | ((prevState: boolean) => boolean)) => { setShowLink(status); setLocal('showLink', status as unknown as string) }, []);
  const setTwitterAddress = useCallback((twitter: SetStateAction<string>) => { setTwitter(twitter); setLocal('twitter', twitter as string) }, []);
  const switchTwitter = useCallback((status: boolean | ((prevState: boolean) => boolean)) => { setShowTwitter(status); setLocal('showTwitter', status as unknown as string) }, []);
  const setWalletPublicAddress = useCallback((walletPublicAddress: SetStateAction<string>) => { setWalletPublicAd(walletPublicAddress); setLocal('walletPublicAddress', walletPublicAddress as string) }, []);
  const setChains = useCallback((chains: SetStateAction<string>) => { setC(chains); setLocal('chains', chains as string) }, []);
  const setGuidStatus = useCallback((status: boolean | ((prevState: boolean) => boolean)) => { setisGuide(status); setLocal('isGuide', status as unknown as string) }, []);


  return { email, showEmail, link, showLink, twitter, showTwitter, setEmailAddress, switchEmail, setLinkAddress, switchLink, setTwitterAddress, switchTwitter, walletPublicAddress, setWalletPublicAddress, chains, setChains, isGuide, setGuidStatus };
};