export const maskPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(?<=.{2}).(?=.*.{3})/g, '*');
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};
