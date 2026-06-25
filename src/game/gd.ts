let pendingReward = false;
let listenersInitialized = false;

export const initListeners = (callbacks?: { onPause?: () => void; onResume?: () => void }) => {
  if (listenersInitialized) return;
  listenersInitialized = true;

  window.addEventListener('gd-pause', () => callbacks?.onPause?.());
  window.addEventListener('gd-resume', () => callbacks?.onResume?.());
  window.addEventListener('gd-reward', () => {
    pendingReward = true;
  });
};

export const isAvailable = (): boolean => {
  return typeof (window as any).gdsdk !== 'undefined' && typeof (window as any).gdsdk.showAd !== 'undefined';
};

export const showMidrollAd = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isAvailable()) {
      resolve(false);
      return;
    }
    (window as any).gdsdk.showAd()
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
};

export const showRewardedAd = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isAvailable()) {
      resolve(false);
      return;
    }
    pendingReward = false;
    (window as any).gdsdk.showAd('rewarded')
      .then(() => resolve(pendingReward))
      .catch(() => resolve(false));
  });
};
